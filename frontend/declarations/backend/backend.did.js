export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'calculate' : IDL.Func([IDL.Vec(IDL.Float64)], [IDL.Opt(IDL.Float64)], []),
  });
};
export const init = ({ IDL }) => { return []; };
