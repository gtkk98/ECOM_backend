import { auth } from "@clerk/nextjs/server";

const TestPage = async () => {
  const session = await auth();
  const token = await session.getToken();

  console.log(token)
  const res = await fetch("http://localhost:8000/test", {
    headers: {
        Authorization: `Bearer ${token}`,
    }
  });
  const data = await res.json();

  console.log(data);
  return <div className="">Test</div>;
};

export default TestPage;
