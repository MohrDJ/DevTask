
export const validateName = (name: string): string | null => {
  if (!name) {
    return 'O campo nome é obrigatório';
  }
  if (!/^[A-Za-z\s]+$/.test(name)) {
    return 'O campo nome só pode conter letras';
  }
  return null; 
};


export const validateEmail = (email: string): string | null => {
  if (!email) {
    return 'O campo email é obrigatório';
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return 'O campo email deve ser um endereço de email válido';
  }
  return null; 
};


export const validatePhone = (phone: string): string | null => {
  if (!phone) {
    return 'O campo telefone é obrigatório';
  }
  if (!/^\d{2}\9\d{4}\d{4}$/.test(phone)) {
    return 'O campo telefone deve estar no formato xx9xxxxxxxx';
  }
  return null; 
};


export const validateSector = (sector: string): string | null => {
  if (!sector || sector === 'Selecione um setor') {
    return 'Selecione um setor válido';
  }
  return null; 
};

export const validateType = (type: string): string | null => {
  if (!type || type === 'Selecione um tipo') {
    return 'Selecione um tipo válido';
  }
  return null; 
};


export const validateTitle = (title: string): string | null => {
  if (!title) {
    return 'O campo título é obrigatório';
  }
  return null; 
};


export const validateDescription = (description: string): string | null => {
  if (!description) {
    return 'O campo descrição é obrigatório';
  }
  return null;
};


export const validateFile = (file: File | null): string | null => {
  if (!file) {
    return 'O campo arquivo é obrigatório';
  }
  if (file.size > 25 * 1024 * 1024) {
    return 'O arquivo selecionado é muito grande. O tamanho máximo permitido é de 25MB!';
  }
  if (!/(\.jpg|\.jpeg|\.png|\.pdf|\.exel|\.docs|\.txt)$/i.test(file.name)) {
    return 'O formato do arquivo não é suportado!';
  }
  return null; 
};
