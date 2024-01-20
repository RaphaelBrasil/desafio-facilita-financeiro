# Teste de Programação Desenvolvedor Facilita Jurídico

## Instruções de Uso

### Pré-requisitos

Certifique-se de ter o Docker e o Docker Compose instalados em sua máquina. Se não estiverem instalados, você pode baixá-los em [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/install/).

### 1. Clone o Repositório

```bash
git clone https://github.com/RaphaelBrasil/desafio-facilita-juridico.git
cd desafio-facilita-juridico
```

### 2. Construa e Execute os Serviços

Execute o seguinte comando para construir e iniciar os serviços usando o Docker Compose:

```bash
docker-compose up --build
```

### 3. Acesso aos Serviços

Backend:
Acesse o backend em http://localhost:8080.
Frontend:
Acesse o frontend em http://localhost:3000.

### 4. Encerrar os Serviços

Para encerrar os serviços, pressione Ctrl + C no terminal onde o docker-compose está em execução.

Ou

```bash
docker-compose down
```

### Observações Importantes

Certifique-se de que as portas 8080 e 3000 em sua máquina não estejam sendo usadas por outros serviços.

O serviço PostgreSQL será inicializado com o banco de dados de exemplo e o usuário "root". Essas configurações podem ser ajustadas no arquivo docker-compose.yml.

O backend depende do banco de dados PostgreSQL. Certifique-se de que o serviço do banco de dados esteja completamente iniciado antes de iniciar o backend.

### Sobre o teste

# Teste de Programação - Desenvolvedor Facilita Jurídico

Este teste tem como objetivo avaliar suas habilidades em programação. Certifique-se de entender os requisitos antes de começar a codificar. Utilize o ambiente de desenvolvimento que se sentir mais confortável. Comente o código conforme necessário para explicar sua lógica. Não hesite em pedir esclarecimentos caso algo não esteja claro.

## Requisito

### Sistema de Gerenciamento de Clientes

#### Parte 1

Uma empresa que realiza limpeza em residências enfrenta desafios no gerenciamento de seus clientes e busca uma solução eficiente para cadastrar e visualizar as informações que hoje são controladas em planilhas. Para centralizar as informações e ajudar na expansão da empresa, ela deseja uma plataforma onde seja possível gerenciar os seus clientes. O sistema deve ser composto por um backend em Node.js utilizando PostgreSQL como banco de dados, e um frontend em React.

A empresa utiliza as seguintes informações para gerenciar seus clientes: nome, email e telefone.

Na plataforma criada deve ser possível:

-   Listar os seus clientes e filtrar com base nas informações cadastradas
-   Cadastrar clientes novos

#### Parte 2

Suponha que, além de cadastrar e visualizar clientes, a empresa deseja otimizar as rotas de atendimento para maximizar a eficiência na visitação dos clientes. Considere um mapa bidimensional representando a localização dos clientes, onde cada ponto cartesiano possui um cliente. Cada cliente cadastrado possui uma coordenada X e uma coordenada Y nesse mapa.

O objetivo é calcular a rota partindo da empresa (0,0) e que passe pela localização de todos os clientes cadastrados no banco de dados e retorne à empresa no final. A rota deve ser calculada para ter a menor distância possível.

O algoritmo para calcular essa rota deve estar disponibilizado via rota da api para ser chamado pelo front quando necessário.

Implemente um botão na tela de clientes que, ao ser clicado, abre uma modal e mostra a ordem de visitação dos clientes na rota calculada. A visualização pode ser a mais simples possível mostrando uma lista dos clientes na ordem que devem ser visitados do primeiro ao último cliente da rota.

Ao desenvolver essa segunda parte, altere a rota de cadastro e visualização para que seja possível cadastrar e visualizar as coordenadas X e Y dos clientes da empresa.
