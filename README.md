# helpdesk-chamados

Sistema de abertura e acompanhamento de chamados de suporte, no estilo de um Help Desk. Primeira versão em HTML, CSS e JavaScript, com os dados salvos no `localStorage` do navegador e sem backend por enquanto.

**Demo:** https://elly0x.github.io/helpdesk-chamados/

```
$ status: v1 concluída
$ stack: html + css + js
$ próximo: c# + banco de dados + api
```

## sobre

Um Help Desk é a estrutura responsável por receber, organizar e resolver pedidos de suporte. O sistema de chamados é a ferramenta que dá suporte a esse processo: cada pedido vira um chamado, que passa por um ciclo de status até ser encerrado.

Esta v1 implementa o fluxo mínimo:

```
abrir chamado -> visualizar chamado -> alterar status -> fechar chamado
```

## funcionalidades da v1

- abrir chamado (título, descrição e prioridade)
- listar chamados (id, título, status, prioridade e data)
- visualizar o detalhe de um chamado
- alterar o status: aberto -> em andamento -> fechado
- fechar o chamado, com a data de fechamento registrada automaticamente

Fora do escopo por enquanto: login e usuários, categorias, comentários, filtros e busca, SLA e notificações.

## estrutura

```
helpdesk-chamados/
├── index.html      lista de chamados
├── novo.html       abrir chamado
├── detalhe.html    detalhe e alteração de status
├── style.css       estilos
└── script.js       dados e interações
```

## como rodar

Não precisa instalar nada. Abra o `index.html` no navegador ou publique a pasta pelo GitHub Pages.

## dados

Os chamados ficam salvos no `localStorage`, na chave `helpdesk_chamados`. Na primeira execução o sistema cria 3 chamados de exemplo. Depois disso, tudo que for criado ou alterado continua salvo no navegador.

Limitação atual: sem backend, os dados ficam presos ao navegador e ao dispositivo. Isso será resolvido na próxima fase.

## design

Tema escuro com paleta âmbar e teal e tipografia monoespaçada, no estilo "log de terminal":

```
--bg:     #14161c
--panel:  #1b1e27
--border: #2a2e3a
--text:   #ece9e2
--amber:  #e8a33d
--teal:   #59b9b6
```

## próximos passos

- [ ] backend em C# (.NET)
- [ ] banco de dados
- [ ] API REST
- [ ] autenticação
- [ ] filtros, busca e categorias

---

Projeto de estudo do curso de Ciência da Computação. Mais projetos em [elly0x.github.io](https://elly0x.github.io/).
