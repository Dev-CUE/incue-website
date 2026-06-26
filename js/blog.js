(async function(){
  const preview=document.querySelector('[data-blog-preview]');
  const list=document.querySelector('[data-blog-list]');
  if(!preview&&!list)return;
  try{
    const posts=await fetch('/blog/posts.json').then(r=>r.json());
    const html=posts.map(post=>`<article class="blog-card"><span>${post.category} · ${post.date}</span><h3>${post.title}</h3><p>${post.description}</p><a class="card-link" href="/blog/${post.slug}.html">${post.category} 글 읽기</a></article>`).join('');
    if(preview)preview.innerHTML=html;
    if(list)list.innerHTML=html;
  }catch(err){
    const fallback='<p class="notice">인사이트 목록을 불러오지 못했습니다.</p>';
    if(preview)preview.innerHTML=fallback;
    if(list)list.innerHTML=fallback;
    console.warn('blog load failed',err);
  }
})();
