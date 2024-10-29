<strong>Objetivo do Projeto</strong>

O projeto é uma aplicação de relatórios com controle de usuários, workspaces, alunos e relatórios. Vamos usar Node.js com Express para o backend e MongoDB como banco de dados. Aqui está a estrutura geral:

Usuário: Pode se registrar, fazer login e ter permissões de acesso. Usuários comuns podem ver todas as workspaces, mas só editar, criar e excluir em sua própria workspace. O usuário admin tem acesso total.

Workspace: Cada usuário possui uma única workspace visível para todos. A workspace contém alunos.

Aluno: Cada workspace pode ter vários alunos. Um aluno pode ter vários relatórios.

Relatório: Cada aluno possui relatórios com informações como resumo, estratégias e status de presença (Presente, Ausente, Justificado).

----------------

<strong>Dependências</strong>

Express: Estrutura de roteamento e middleware do backend.

Mongoose: Interface para conexão com o MongoDB.

bcrypt: Biblioteca para hash de senhas.

jsonwebtoken: Geração e verificação de tokens JWT para autenticação.

dotenv: Para gerenciar variáveis de ambiente.

helmet: Melhorar a segurança adicionando cabeçalhos HTTP.

cors: Permitir solicitações de diferentes origens (cross-origin).

express-rate-limit: Limitar a quantidade de requisições para evitar ataques de força bruta.

joi: Validação de dados de entrada no backend.