export const getInitialState = (state) => {
  if (!state) return;

  const _localInitialState = JSON.parse(localStorage.getItem(state) || "{}");

  if (_localInitialState) {
    return _localInitialState;
  }

  return {};
};
