import withAuth from "next-auth/middleware";

const needAuth = ["/combat(.)*", "/hub(.)*"];

export default withAuth(function middleware() {}, {
  callbacks: {
    authorized: ({ req, token }) => {
      const path = req.nextUrl.pathname;
      if (needAuth.some((authPath) => path.match(authPath))) {
        return !!token;
      }

      return true;
    },
  },
});
