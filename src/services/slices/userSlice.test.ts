import reducer, {
  getUserLogout,
  getUserData,
  getUserStatus,
  registerUser,
  loginUser,
  getUser,
  updateUser,
  logoutUser,
  initialState
} from './userSlice';
import { TUser } from '@utils-types';

describe('тесты слайса userSlice', () => {
  const mockUser: TUser = {
    email: 'yury@test.ru',
    name: 'yury'
  };

  it('тест для экшена getUserLogout', () => {
    const actual = reducer(
      { ...initialState, user: mockUser },
      getUserLogout()
    );
    expect(actual).toEqual(initialState);
  });

  describe('тест редьюсера registerUser', () => {
    it('тест для registerUser.pending', () => {
      const action = { type: registerUser.pending.type };
      const state = reducer(initialState, action);
      expect(state.isLoading).toBe(true);
    });
    it('тест для registerUser.fulfilled', () => {
      const action = {
        type: registerUser.fulfilled.type,
        payload: { user: mockUser }
      };
      const state = reducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.user).toEqual(action.payload.user);
    });
    it('тест для registerUser.rejected', () => {
      const action = {
        type: registerUser.rejected.type,
        error: { message: 'registerUser rejected' }
      };
      const state = reducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.error).toBe('registerUser rejected');
    });
  });

  describe('тест редьюсера loginUser', () => {
    it('тест для loginUser.pending', () => {
      const action = { type: loginUser.pending.type };
      const state = reducer(initialState, action);
      expect(state.isLoading).toBe(true);
    });
    it('тест для loginUser.fulfilled', () => {
      const action = {
        type: loginUser.fulfilled.type,
        payload: { user: mockUser }
      };
      const state = reducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.isInit).toBe(true);
      expect(state.user).toEqual(action.payload.user);
    });
    it('тест для loginUser.rejected', () => {
      const action = {
        type: loginUser.rejected.type,
        error: { message: 'loginUser rejected' }
      };
      const state = reducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.error).toBe('loginUser rejected');
    });
  });

  describe('тест редьюсера getUser', () => {
    it('тест для getUser.pending', () => {
      const action = { type: getUser.pending.type };
      const state = reducer(initialState, action);
      expect(state.isLoading).toBe(true);
    });
    it('тест для getUser.fulfilled', () => {
      const action = {
        type: getUser.fulfilled.type,
        payload: { user: mockUser }
      };
      const state = reducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.isInit).toBe(true);
      expect(state.user).toEqual(action.payload.user);
    });
    it('тест для getUser.rejected', () => {
      const action = {
        type: getUser.rejected.type,
        error: { message: 'getUser rejected' }
      };
      const state = reducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.error).toBe('getUser rejected');
    });
  });

  describe('тест редьюсера updateUser', () => {
    it('тест для updateUser.pending', () => {
      const action = { type: updateUser.pending.type };
      const state = reducer(initialState, action);
      expect(state.isLoading).toBe(true);
    });
    it('тест для updateUser.fulfilled', () => {
      const action = {
        type: updateUser.fulfilled.type,
        payload: { user: { email: 'yury-yury@test.ru', name: 'yury-yury' } }
      };
      const state = reducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.user).toEqual(action.payload.user);
    });
    it('тест для updateUser.rejected', () => {
      const action = {
        type: updateUser.rejected.type,
        error: { message: 'updateUser rejected' }
      };
      const state = reducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.error).toBe('updateUser rejected');
    });
  });

  describe('тест редьюсера logoutUser', () => {
    it('тест для logoutUser.pending', () => {
      const action = { type: logoutUser.pending.type };
      const state = reducer(initialState, action);
      expect(state.isLoading).toBe(true);
    });
    it('тест для logoutUser.fulfilled', () => {
      const action = { type: logoutUser.fulfilled.type };
      const state = reducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.isInit).toBe(false);
      expect(state.user).toEqual({ email: '', name: '' });
    });
    it('тест для logoutUser.rejected', () => {
      const action = {
        type: logoutUser.rejected.type,
        error: { message: 'logoutUser rejected' }
      };
      const state = reducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.error).toBe('logoutUser rejected');
    });
  });
});
