export default function Home() {
  const cards = [
    { title: "Saldo Atual", value: "R$ 12.480,00", tone: "text-emerald-700" },
    { title: "Receitas (Mês)", value: "R$ 8.250,00", tone: "text-sky-700" },
    { title: "Despesas (Mês)", value: "R$ 4.980,00", tone: "text-rose-700" },
    { title: "Investimentos", value: "R$ 22.300,00", tone: "text-violet-700" },
  ];

  const transactions = [
    {
      name: "Salário",
      date: "20/04/2026",
      category: "Renda",
      amount: "+ R$ 6.500,00",
    },
    {
      name: "Supermercado",
      date: "19/04/2026",
      category: "Alimentação",
      amount: "- R$ 432,70",
    },
    {
      name: "Internet",
      date: "18/04/2026",
      category: "Casa",
      amount: "- R$ 129,90",
    },
    {
      name: "Freelance",
      date: "17/04/2026",
      category: "Renda Extra",
      amount: "+ R$ 1.250,00",
    },
  ];

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#dbeafe,_#f8fafc_45%,_#f1f5f9)] px-6 py-10 text-slate-900 sm:px-10 lg:px-16">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <header className="rounded-2xl border border-white/60 bg-white/70 p-6 shadow-sm backdrop-blur-sm">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">
            Painel Financeiro
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Controle suas financas com clareza
          </h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Estrutura inicial para acompanhar saldo, entradas, saidas e
            historico de transacoes.
          </p>
        </header>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => (
            <article
              key={card.title}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <p className="text-sm text-slate-500">{card.title}</p>
              <p className={`mt-2 text-2xl font-semibold ${card.tone}`}>
                {card.value}
              </p>
            </article>
          ))}
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Ultimas transacoes</h2>
            <button
              type="button"
              className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
            >
              Nova transacao
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-separate border-spacing-y-2 text-left">
              <thead>
                <tr className="text-sm text-slate-500">
                  <th className="font-medium">Descricao</th>
                  <th className="font-medium">Categoria</th>
                  <th className="font-medium">Data</th>
                  <th className="font-medium text-right">Valor</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((item) => (
                  <tr key={`${item.name}-${item.date}`} className="bg-slate-50">
                    <td className="rounded-l-lg px-3 py-3 font-medium">
                      {item.name}
                    </td>
                    <td className="px-3 py-3 text-slate-600">
                      {item.category}
                    </td>
                    <td className="px-3 py-3 text-slate-600">{item.date}</td>
                    <td className="rounded-r-lg px-3 py-3 text-right font-semibold text-slate-800">
                      {item.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold">Metas do mes</h3>
            <p className="mt-2 text-slate-600">
              Economizar 20% da renda mensal.
            </p>
            <div className="mt-4 h-3 w-full rounded-full bg-slate-100">
              <div className="h-3 w-3/5 rounded-full bg-emerald-500" />
            </div>
            <p className="mt-2 text-sm text-slate-500">60% concluido</p>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold">Proximos pagamentos</h3>
            <ul className="mt-3 space-y-2 text-slate-700">
              <li>Aluguel - 05/05 - R$ 1.500,00</li>
              <li>Energia - 08/05 - R$ 230,00</li>
              <li>Cartao - 10/05 - R$ 1.120,00</li>
            </ul>
          </article>
        </section>
      </main>
    </div>
  );
}
