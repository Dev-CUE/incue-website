export async function onRequestPost({ request, env }) {
  let data;
  try {
    data = await request.json();
  } catch (error) {
    return json({ message: '요청 형식이 올바르지 않습니다.' }, 400);
  }

  const required = ['name', 'company', 'phone', 'interest', 'privacy'];
  const missing = required.filter((key) => !String(data[key] || '').trim());
  if (missing.length) {
    return json({ message: '필수 항목을 모두 입력해주세요.', missing }, 400);
  }

  if (!env.CONTACT_WEBHOOK_URL && !env.RESEND_API_KEY) {
    return json({ message: '문의 접수 시스템 설정 중입니다. 전화 또는 이메일로 문의해주세요.' }, 503);
  }

  const payload = {
    source: 'incue.frameq.io',
    receivedAt: new Date().toISOString(),
    name: clean(data.name),
    company: clean(data.company),
    phone: clean(data.phone),
    email: clean(data.email),
    role: clean(data.role),
    interest: clean(data.interest),
    problem: Array.isArray(data.problem) ? data.problem.map(clean) : [],
    message: clean(data.message),
  };

  if (env.CONTACT_WEBHOOK_URL) {
    const response = await fetch(env.CONTACT_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!response.ok) return json({ message: '문의 접수 연동에 실패했습니다.' }, 502);
    return json({ message: '진단 요청이 접수되었습니다. 담당자가 검토 후 연락드리겠습니다.' });
  }

  const to = env.CONTACT_TO_EMAIL || 'sales@incue.co.kr';
  const from = env.CONTACT_FROM_EMAIL || 'Incue Contact <onboarding@resend.dev>';
  const subject = `[Incue] 무료 진단 신청 - ${payload.company}`;
  const body = Object.entries(payload).map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(', ') : value}`).join('\n');
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from, to, subject, text: body }),
  });
  if (!response.ok) return json({ message: '메일 발송에 실패했습니다.' }, 502);
  return json({ message: '진단 요청이 접수되었습니다. 담당자가 검토 후 연락드리겠습니다.' });
}

export async function onRequestGet() {
  return json({ message: 'Method Not Allowed' }, 405);
}

function clean(value) {
  return String(value || '').replace(/[<>]/g, '').trim().slice(0, 2000);
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}
