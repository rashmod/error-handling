export type Result<V, E> = { ok: true; value: V } | { ok: false; error: E };

export const ok = <V>(value: V): Result<V, never> => ({ ok: true, value });

export const err = <E>(error: E): Result<never, E> => ({ ok: false, error });
