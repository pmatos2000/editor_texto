interface IBotao {
  idHtml: string;
  acao: () => void;
}

const areaTexto = <HTMLDivElement | undefined>(
  document.getElementById("areaTexto")
);

const adicionarEstilo = (selecao: Selection, elemento: HTMLElement) => {
  if (
    selecao?.anchorNode instanceof Text &&
    selecao?.focusNode instanceof Text
  ) {
    return true;
  }
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
    pai.removeChild(elemento);
    if (elementoTextoAntesSelecao) pai.appendChild(elementoTextoAntesSelecao);
    pai.appendChild(estilo);
    if (elementoTextoDepoisSelecao) pai.appendChild(elementoTextoDepoisSelecao);
  }
};

const acaoBotaoNegrito = () => {
  if (areaTexto) {
    const selecao = document.getSelection();
    console.log(selecao);
    if (selecao?.anchorNode instanceof Text) {
      for (let i = 0; i < selecao.rangeCount; i++) {
        const range = selecao.getRangeAt(i);
        console.log(range);
        modificarEstiloTextoLinha(
          selecao?.anchorNode,
          document.createElement("strong"),
          range.startOffset,
          range.endOffset
        );
      }
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
