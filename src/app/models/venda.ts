export interface Venda {
    id?: number;
    codigoVenda: number;
    dataVenda: Date;
    nomeProduto: string;
    valorProduto: number;
    quantidadeProduto: number;
    valorTotal: number;
}