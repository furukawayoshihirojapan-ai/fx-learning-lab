document.addEventListener('DOMContentLoaded',()=>{
  const b=document.querySelector('.mobile-menu'),nav=document.querySelector('.nav');
  if(b&&nav)b.addEventListener('click',()=>{let isOpen=nav.classList.toggle('open');b.setAttribute('aria-expanded',String(isOpen));b.textContent=isOpen?'Close menu':'Menu'});
  document.querySelectorAll('[data-quiz]').forEach(form=>{
    const answers=JSON.parse(form.getAttribute('data-answers'));
    form.addEventListener('submit',event=>{
      event.preventDefault();let score=0,missing=0;
      for(let i=0;i<answers.length;i++){
        const el=form.querySelector(`input[name="q${i}"]:checked`);
        const response=form.querySelector(`[data-feedback="${i}"]`);
        if(!el){missing++;response.textContent='Choose one answer to see the explanation.';response.classList.remove('hidden');continue;}
        const right=el.value===String(answers[i][0]);if(right)score++;
        response.textContent=(right?'Correct. ':'Not quite. ')+answers[i][1];
        response.classList.remove('hidden');
      }
      const status=form.querySelector('[aria-live]');status.textContent=missing?`You answered ${answers.length-missing} of ${answers.length} questions. ${score} correct so far.`:`You answered ${score} of ${answers.length} questions correctly. Review the explanations and try again if needed.`;
    });
    form.querySelector('[data-reset]')?.addEventListener('click',()=>{form.reset();form.querySelectorAll('[data-feedback]').forEach(x=>{x.textContent='';x.classList.add('hidden')});form.querySelector('[aria-live]').textContent='';});
  });
  const calc=document.querySelector('[data-calculator]');
  if(calc){const balance=calc.querySelector('#balance'),risk=calc.querySelector('#risk'),output=calc.querySelector('#risk-result'),err=calc.querySelector('#risk-error');
    function change(){const b=Number(balance.value),r=Number(risk.value);if(balance.value===''||risk.value===''||!Number.isFinite(b*r)||b<=0||r<0||r>100){output.textContent='—';err.textContent='Enter a positive account amount and a percentage from 0 to 100.';return;}output.textContent=new Intl.NumberFormat('en-US',{minimumFractionDigits:2,maximumFractionDigits:2}).format(b*r/100);err.textContent='';}
    balance.addEventListener('input',change);risk.addEventListener('input',change);change();
  }
});