import { Link, useSearchParams } from 'react-router';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export default function OrderSuccess() {
  const [params] = useSearchParams();
  const order = params.get('order') ?? 'AT-DEMO';
  const total = params.get('total') ?? '0';

  return (
    <main className="mx-auto max-w-[720px] px-5 py-24 text-center">
      <CheckCircle2 size={56} className="mx-auto text-[#0057f3]" strokeWidth={1.5} />
      <p className="section-no mt-6 text-[#0057f3]">( ORDER {order} )</p>
      <h1 className="mt-3 font-display text-[clamp(2rem,4vw,3rem)] font-black tracking-tight">
        You're enrolled.
      </h1>
      <p className="mx-auto mt-4 max-w-md text-[15px] text-[#666]">
        Payment of <strong className="text-[#0a0a0a]">${total}</strong> confirmed. Course access links are on their way
        to your inbox — lifetime access starts now.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Link to="/courses" className="btn-pill bg-[#0a0a0a] text-white">
          Keep browsing <ArrowRight size={15} />
        </Link>
        <Link to="/" className="btn-pill border border-[#0a0a0a] bg-white text-[#0a0a0a]">
          Back home
        </Link>
      </div>
    </main>
  );
}
