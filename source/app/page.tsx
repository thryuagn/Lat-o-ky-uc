import { redirect } from 'next/navigation';
export default async function Page({searchParams}:{searchParams:Promise<{join?:string}>}){const p=await searchParams;redirect('/online.html'+(p.join?'?join='+encodeURIComponent(p.join):''))}
