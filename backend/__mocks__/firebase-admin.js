// Mock Firebase Admin to avoid real network calls during tests
const authMock = {
  verifyIdToken: jest.fn((token) => {
    if (token === "valid-token") {
      return Promise.resolve({ uid: "123", email: "testuser@example.com" });
    }
    return Promise.reject(new Error("Invalid token"));
  }),
};

const firestoreMock = () => ({
  collection: jest.fn(() => ({
    doc: jest.fn(() => ({
      get: jest.fn(() =>
        Promise.resolve({ exists: true, data: () => ({ participants: ["123"] }) })
      ),
      set: jest.fn(() => Promise.resolve()),
      update: jest.fn(() => Promise.resolve()),
      collection: jest.fn(() => ({
        add: jest.fn(() => Promise.resolve({ id: "mock-msg-id" })),
        orderBy: jest.fn(() => ({
          get: jest.fn(() =>
            Promise.resolve({ docs: [{ id: "mock-msg-id", data: () => ({ text: "hello" }) }] })
          ),
        })),
      })),
    })),
  })),
});

module.exports = {
  initializeApp: jest.fn(),
  credential: {
    cert: jest.fn(),
  },
  auth: () => authMock,
  firestore: firestoreMock,
};