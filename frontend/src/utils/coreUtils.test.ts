import { describe, expect, test } from 'vitest';

import { createLinkToDocumentOnToApi } from '@/utils/coreUtils';

describe('create a link to a document from strapi', () => {
  test('create link to te strapi documents', () => {
    const urlOfDocument = '/test/image/document.png';

    const createdLink = createLinkToDocumentOnToApi(urlOfDocument);
    const expectedLink = import.meta.env.VITE_BASE_IMAGE_URL + urlOfDocument;

    expect(createdLink).toBe(expectedLink);
  });
});