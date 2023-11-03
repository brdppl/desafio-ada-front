enum AlertMsg {
  FILL_REQUIRED_FIELDS = 'Preencha os campos obrigatórios.',
  INVALID_USER = 'Usuário ou senha inválidos.',
  SESSION_EXPIRED = 'A sessão expirou.'
};

enum ErrorMsg {
  ADD_CARD_ERROR = 'Erro ao adicionar a tarefa. Tente novamente.',
  GET_CARDS_ERROR = 'Erro ao carregar os itens.',
  REMOVE_CARD_ERROR = 'Erro ao excluir a tarefa. Tente novamente.',
  EDIT_CARD_ERROR = 'Erro ao editar a tarefa. Tente novamente.'
};

export { AlertMsg, ErrorMsg };