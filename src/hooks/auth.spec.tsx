import { renderHook, act } from '@testing-library/react-hooks';
import { mocked } from 'ts-jest/utils';
import { AuthProvider, useAuth } from './auth';
import { logInAsync } from 'expo-google-app-auth';

jest.mock('expo-google-app-auth');

describe('Auth Hook', () => {
  it('should be able to sign in with Google account existed', async () => {
    const googleMocked = mocked(logInAsync as any);
    googleMocked.mockReturnValueOnce({
      type: 'success',
      user: {
        id: 'any_id',
        email: 'rodrigo.sartori00@yahoo.com',
        name: 'Rodrigo',
        photo: 'any_photo.png',
      },
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    await act(() => result.current.signInWithGoogle());

    expect(result.current.user.email).toBe('rodrigo.sartori00@yahoo.com');
  });

  it('user should not connect if cancel authentication with Google', async () => {
    const googleMocked = mocked(logInAsync as any);
    googleMocked.mockReturnValueOnce({
      type: 'cancel',
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    await act(() => result.current.signInWithGoogle());

    expect(result.current.user).not.toHaveProperty('id');
  });

  it('should be error sign in with Google if not return type', async () => {
    const googleMocked = mocked(logInAsync as any);
    googleMocked.mockReturnValueOnce({});

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    try {
      await act(() => result.current.signInWithGoogle());
    } catch {
      expect(result.current.user).toThrowError();
    }
  });
});
