const stats = [
  { number: '500', suffix: '+', label: 'Projetos jurídicos entregues' },
  { number: '4.9', suffix: '★', label: 'Avaliação média (127 reviews)' },
  { number: '20', suffix: '+', label: 'Anos de experiência técnica' },
  { number: '100', suffix: '%', label: 'Conformidade com a OAB' }
];

export default function Stats() {
  return (
    <section className="relative bg-cream-50 py-20">
      <div className="container-pp">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4 md:divide-x md:divide-ink-100">
          {stats.map((s, i) => (
            <div key={s.label} className={`text-center md:px-6 ${i === 0 ? '' : ''}`}>
              <div className="font-display text-5xl font-extrabold tracking-tightest text-primary md:text-6xl">
                {s.number}
                <span className="text-accent">{s.suffix}</span>
              </div>
              <div className="mt-2 text-sm font-light text-ink-500">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
