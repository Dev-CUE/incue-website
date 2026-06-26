(function(){
  const form=document.querySelector('[data-contact-form]');
  if(!form)return;
  const status=form.querySelector('[data-form-status]');
  const submit=form.querySelector('button[type="submit"]');
  const setStatus=(message,type='info')=>{
    if(!status)return;
    status.hidden=false;
    status.textContent=message;
    status.dataset.statusType=type;
  };
  form.addEventListener('submit',async(event)=>{
    event.preventDefault();
    if(!form.reportValidity())return;
    const payload={};
    const problems=[];
    new FormData(form).forEach((value,key)=>{
      if(key==='problem')problems.push(value);
      else payload[key]=value;
    });
    payload.problem=problems;
    submit?.setAttribute('disabled','disabled');
    setStatus('진단 요청을 접수하는 중입니다.','info');
    try{
      const response=await fetch(form.action||'/api/contact',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(payload)
      });
      const result=await response.json().catch(()=>({}));
      if(!response.ok)throw new Error(result.message||'문의 접수 설정을 확인해야 합니다.');
      setStatus(result.message||'진단 요청이 접수되었습니다. 담당자가 검토 후 연락드리겠습니다.','success');
      form.reset();
    }catch(error){
      setStatus(error.message||'일시적으로 접수하지 못했습니다. 전화 또는 이메일로 문의해주세요.','error');
    }finally{
      submit?.removeAttribute('disabled');
    }
  });
})();
