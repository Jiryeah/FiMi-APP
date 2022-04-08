const { signToken } = require('../utils/auth');
//* variable name of 'supervisor' may change depending on model information
const resolvers = {
  Mutation: {
    addSupervisor: async (parent, args) => {
      const qaSupervisor = await QaSupervisor.create(args);
      const token = signToken(supervisor);

      return { token, qaSupervisor };
    },
    login: async (parent, { email, password }) => {
      const qaSupervisor = await QaSupervisor.findOne({ email });

      if (!qaSupervisor) {
        throw new AuthenticationError('Invalid credentials');
      }

      const correctPw = await qaSupervisor.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Invalid credentials');
      }

      const token = signToken(qaSupervisor);
      return { token, qaSupervisor };
    },
  },
};

module.exports = resolvers;
