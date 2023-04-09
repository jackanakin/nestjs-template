import { Validation } from './pick/@common/validation.i18n';
import { Register422 } from './pick/register/422.i18n';

// Common
const Common = { Validation };

// Modules
const registerModule = { http422: Register422 };

const Modules = {
  Register: registerModule,
};

// Export
const TextPick = {
  Common,
  Modules,
};

export default TextPick;
