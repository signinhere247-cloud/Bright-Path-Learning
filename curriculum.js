import {expandedFactQuestions} from './expandedFacts.js';
// Pure question generation so lessons can be tested without a browser or 3D renderer.
export function learningBand(age) {
  const value = Number(age);
  if (!Number.isInteger(value) || value < 3 || value > 16) throw new Error('Learning age must be 3–16.');
  return value <= 6 ? 'early' : value <= 10 ? 'primary' : value <= 13 ? 'intermediate' : 'advanced';
}
export function mathsQuestions(topic, age, count = 20) {
  const band = learningBand(age);
  if (!Number.isInteger(count) || count < 1 || count > 50) throw new Error('Invalid question count.');
  const supported = new Set(['Counting','Addition','Subtraction','Multiplication','Division','Fractions','Percentages','Algebra']);
  if (!supported.has(topic)) throw new Error('Unknown maths topic.');
  const max = {early:10, primary:40, intermediate:120, advanced:500}[band];
  return Array.from({length:count}, (_,i) => {
    const a = 1 + ((i * 13 + Number(age) * 7) % max);
    const b = 1 + ((i * 7 + Number(age)) % Math.max(3, Math.floor(max / 3)));
    let prompt, answer;
    switch (topic) {
      case 'Counting': answer = a + 1; prompt = `What number comes after ${a}?`; break;
      case 'Addition': answer = a + b; prompt = `${a} + ${b} = ?`; break;
      case 'Subtraction': answer = a; prompt = `${a+b} − ${b} = ?`; break;
      case 'Multiplication': answer = a * (b % 12 + 1); prompt = `${a} × ${b % 12 + 1} = ?`; break;
      case 'Division': answer = a; prompt = `${a * (b % 12 + 1)} ÷ ${b % 12 + 1} = ?`; break;
      case 'Fractions': {const denominator=[2,3,4,5,10][i%5];answer=a;prompt=`What is 1/${denominator} of ${a*denominator}?`;break;}
      case 'Percentages': {const percentage=[10,20,25,50][i%4];answer=a; const whole=a*100/percentage; prompt=`What is ${percentage}% of ${whole}?`;break;}
      case 'Algebra': answer=a;prompt=`Solve x + ${b} = ${a+b}. What is x?`;break;
    }
    const options=[answer, answer + Math.max(1, Math.ceil(answer*.1)), Math.max(0,answer-Math.max(1,Math.ceil(answer*.1)))].map(String);
    if(new Set(options).size!==3) options[2]=String(answer+Math.max(2,Math.ceil(answer*.2))+1);
    return {prompt, answer:String(answer), options};
  });
}
export function factQuestions(facts, topic) {
  const source=facts[topic];
  if (!Array.isArray(source) || !source.length) throw new Error('No questions available for this topic.');
  return source.map(([prompt,answer,options])=>({prompt,answer,options:[...options]}));
}
export function questionSet(subject, topic, age, facts) {
  learningBand(age);
  return subject==='Maths'?mathsQuestions(topic,age):expandedFactQuestions(topic,age,facts);
}
