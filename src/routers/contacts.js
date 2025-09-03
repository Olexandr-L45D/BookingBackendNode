import { Router } from 'express';

const router = Router();
import {
  contactAllControl,
  contactByIdControl,
  createContactController,
  deleteContactControl,
  upsertContactControl,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  createContactsSchema,
  updateContactsSchema,
} from '../validation/contacts.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';

router.use(authenticate);
// створюю контакт
router.post(
  '/',
  validateBody(createContactsSchema),
  ctrlWrapper(createContactController),
);
// знаходжу всі контакти
router.get('/', ctrlWrapper(contactAllControl));
// знаходжу контакти по contactId
router.get('/:contactId', isValidId, ctrlWrapper(contactByIdControl));
// редагую контакт
router.put(
  '/:contactId',
  isValidId,
  validateBody(updateContactsSchema),
  ctrlWrapper(upsertContactControl),
);
// видаляю контакт
router.delete('/:contactId', isValidId, ctrlWrapper(deleteContactControl));
export default router;
