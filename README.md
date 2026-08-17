# helpdesk-chamados

Sistema de abertura e acompanhamento de chamados de suporte, no estilo de um Help Desk. Primeira versão em HTML, CSS e JavaScript puros, com os dados salvos no `localStorage` do navegador — sem backend por enquanto.

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

- abrir chamado (título, descrição, prioridade)
- listar chamados (id, título, status, prioridade, data)
- visualizar detalhe de um chamado
- alterar status: aberto -> em andamento -> fechado
- fechar chamado, com data de fechamento registrada automaticamente

fora do escopo por enquanto: login/usuários, categorias, comentários, filtros/busca, SLA, notificações.

## estrutura

```
helpdesk-chamados/
├── index.html      lista de chamados
├── novo.html        abrir chamado
├── detalhe.html      detalhe + alteração de status
├── style.css         identidade visual
└── script.js          dados e interações
```

## rodar

Abrir `index.html` direto no navegador, ou publicar a pasta via GitHub Pages.

## identidade visual

Tema escuro com paleta âmbar/teal e tipografia monoespaçada, no estilo "log de terminal" — as cores seguem exatamente a paleta usada no [grade-curricular-cc](https://github.com/Elly0x/grade-curricular-cc):

```
--bg:     #14161c
--panel:  #1b1e27
--border: #2a2e3a
--text:   #ece9e2
--amber:  #e8a33d
--teal:   #59b9b6
```

## dados

Os chamados ficam salvos no `localStorage`, chave `helpdesk_chamados`. Na primeira execução o sistema semeia 3 chamados de exemplo; depois disso, tudo que for criado ou alterado persiste no navegador.

Limitação atual: sem backend, os dados ficam presos ao navegador/dispositivo. Resolvido na próxima fase.

## próximos passos

- [ ] backend em C# (.NET)
- [ ] banco de dados
- [ ] API REST
- [ ] autenticação
- [ ] filtros, busca, categorias

---

Projeto de estudo — portfólio pessoal, curso de Ciência da Computação.
