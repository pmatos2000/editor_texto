interface IBotao {
  idHtml: string;
  acao: () => void;
}

const areaTexto = <HTMLDivElement | undefined>(
  document.getElementById("areaTexto")
);

const adicionarEstilo = (selecao: Selection, estilo: HTMLElement) => {
  if (
    selecao.anchorNode instanceof Text &&
    selecao.anchorNode === selecao.focusNode
  ) {
    const range = selecao.getRangeAt(0);
    modificarEstiloTextoLinha(
      selecao.anchorNode,
      estilo,
      range.startOffset,
      range.endOffset
    );
  }
};

const atualizarFilhosElementos = (
  pai: Node,
  elementoQueVaiSerRemovido: Node,
  elemento: Node,
  elementoAntes: Node | null = null,
  elementoDepois: Node | null = null
) => {
  if (elementoAntes) pai.insertBefore(elementoAntes, elementoQueVaiSerRemovido);
  pai.insertBefore(elemento, elementoQueVaiSerRemovido);
  if (elementoDepois)
    pai.insertBefore(elementoDepois, elementoQueVaiSerRemovido);
  pai.removeChild(elementoQueVaiSerRemovido);
};

const modificarEstiloTextoLinha = (
  elemento: Text,
  estilo: HTMLElement,
  inicio: number,
  fim: number
) => {
  if (inicio === fim) return;
  const pai = elemento.parentElement;
  if (pai) {
    const texto = elemento.data;
    const elementoTextoAntesSelecao =
      inicio !== 0 ? document.createTextNode(texto.substring(0, inicio)) : null;
    estilo.appendChild(document.createTextNode(texto.substring(inicio, fim)));
    const elementoTextoDepoisSelecao =
      fim !== texto.length
        ? document.createTextNode(texto.substring(fim))
        : null;

    atualizarFilhosElementos(
      pai,
      elemento,
      estilo,
      elementoTextoAntesSelecao,
      elementoTextoDepoisSelecao
    );
  }
};

const acaoBotaoNegrito = () => {
  if (areaTexto) {
    const selecao = document.getSelection();
    if (selecao) {
      adicionarEstilo(selecao, document.createElement("strong"));
    }
  }
};

const listaBotao: IBotao[] = [
  {
    idHtml: "botaoNegrito",
    acao: acaoBotaoNegrito,
  },
];

const listaElementoBotoes = document.getElementsByClassName(
  "botaoMenu"
) as HTMLCollectionOf<HTMLButtonElement>;

for (const elemento of listaElementoBotoes) {
  const botao = listaBotao.find((b) => b.idHtml === elemento.id);
  if (botao) {
    elemento.onclick = botao.acao;
  }
}
