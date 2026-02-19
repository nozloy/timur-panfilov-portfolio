import React from 'react';

const highlights = ['Тендерные сметы', 'Застройка под ключ', 'Шеф-монтаж и ЭКСПО'];

const MiniOgPage: React.FC = () => {
  return (
    <main className="min-h-screen w-full bg-[#0b0d11] flex items-center justify-center p-4 md:p-8">
      <section className="relative w-full max-w-[1200px] aspect-[1200/630] overflow-hidden rounded-[28px] border border-white/10 shadow-[0_28px_100px_rgba(0,0,0,0.45)] bg-[#13161d]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_18%,rgba(157,164,179,0.22),transparent_40%),radial-gradient(circle_at_10%_90%,rgba(96,106,124,0.18),transparent_44%)]"></div>
        <div className="relative z-10 h-full grid grid-cols-[37%_63%]">
          <div className="relative overflow-hidden border-r border-white/10">
            <img
              alt="Тимур Панфилов"
              src="/images/photo.jpeg"
              className="w-full h-full object-cover object-top grayscale contrast-125 brightness-90"
              decoding="async"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>
          </div>

          <div className="p-12 flex flex-col justify-center">
            <h1 className="text-[5rem] leading-[0.86] font-extrabold tracking-[-0.02em] text-zinc-100">
              Тимур
              <br />
              Панфилов
            </h1>

            <p className="mt-4 text-[1.02rem] font-semibold tracking-[0.08em] uppercase text-zinc-300">
              Застройка и декор мероприятий
            </p>

            <div className="mt-4 grid grid-cols-2 gap-x-8 gap-y-1 text-zinc-300/95 text-[1rem] font-medium">
              <p>10+ лет в производстве</p>
              <p>5+ лет в ивенте</p>
              <p className="col-span-2">Формат: фестивали, конференции, ЭКСПО</p>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              {highlights.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center px-4 py-2 rounded-full border border-white/20 bg-white/5 text-[0.86rem] font-semibold text-zinc-200 tracking-[0.03em]"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-7 flex items-center gap-9 text-zinc-200">
              <div className="flex items-center gap-3 text-[1.03rem] font-semibold">
                <i className="fas fa-phone text-sm opacity-80" aria-hidden="true"></i>
                <span>+7 999 164 99 19</span>
              </div>
              <div className="flex items-center gap-3 text-[1.03rem] font-semibold">
                <i className="fab fa-telegram-plane text-sm opacity-80" aria-hidden="true"></i>
                <span>@timur_panfilovich</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default MiniOgPage;
