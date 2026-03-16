"use client";

import { useState } from "react";

export default function Page() {
  const referencias = [
    { nome: "Maracanã", valor: 0.00714, tipo: "icone" },
    { nome: "piscina olímpica", valor: 0.00125, tipo: "objeto" },
    { nome: "ônibus", valor: 0.00005, tipo: "objeto" },

    { nome: "Niterói", valor: 133, tipo: "cidade" },
    { nome: "Belo Horizonte", valor: 331, tipo: "cidade" },
    { nome: "Salvador", valor: 693, tipo: "cidade" },
    { nome: "Rio de Janeiro", valor: 1200, tipo: "cidade" },
    { nome: "São Paulo", valor: 1521, tipo: "cidade" },

    { nome: "Luxemburgo", valor: 2586, tipo: "país" },
    { nome: "Líbano", valor: 10452, tipo: "país" },
    { nome: "Jamaica", valor: 10991, tipo: "país" },

    { nome: "Sergipe", valor: 21910, tipo: "estado" },
    { nome: "Alagoas", valor: 27843, tipo: "estado" },
    { nome: "Espírito Santo", valor: 46074, tipo: "estado" },
  ];

  const [valor, setValor] = useState("");
  const [unidade, setUnidade] = useState("km2");

  const calcular = () => {
    let numero = parseFloat(valor);
    if (!numero) return [];

    if (unidade === "hectare") numero = numero / 100;

    const escolherMaisProximo = (tipo: string) => {
      return referencias
        .filter((r) => r.tipo === tipo)
        .sort((a, b) => Math.abs(numero - a.valor) - Math.abs(numero - b.valor))[0];
    };

    const equivalenteExato = referencias
      .sort((a, b) => Math.abs(numero - a.valor) - Math.abs(numero - b.valor))[0];

    const itens = [
      escolherMaisProximo("estado"),
      escolherMaisProximo("país"),
      escolherMaisProximo("cidade"),
      referencias.find((r) => r.nome === "piscina olímpica"),
      referencias.find((r) => r.nome === "Maracanã"),
      referencias.find((r) => r.nome === "ônibus"),
      equivalenteExato,
    ];

    return itens.map((item: any) => ({
      ...item,
      quantidade: numero / item.valor,
    }));
  };

  const resultado = calcular();

  const formatar = (valor: number) => {
    if (valor < 1) return `${valor * 1000000} m²`;
    return `${valor} km²`;
  };

  return (
    <div className="min-h-screen bg-white p-8 flex justify-center items-center">
      <div className="max-w-xl w-full border rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6">Quanto dá isso?</h1>

        <div className="flex gap-2 mb-6">
          <input
            type="number"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            className="border rounded-xl p-3 w-full"
            placeholder="Digite uma área"
          />

          <select
            value={unidade}
            onChange={(e) => setUnidade(e.target.value)}
            className="border rounded-xl p-3"
          >
            <option value="km2">km²</option>
            <option value="hectare">hectares</option>
          </select>
        </div>

        <div className="space-y-3">
          {resultado.map((item, i) => (
            <div key={i} className="border rounded-xl p-3">
              A área equivale a {item.quantidade.toFixed(1)} {item.nome} ({formatar(item.valor)})
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}