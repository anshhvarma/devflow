import React from "react";

import { auth } from "@/auth";

const Home = async () => {
  const session = await auth();

  console.log(session);
  return (
    <div>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus
      perferendis consectetur doloribus fugit vitae dolore ipsa similique totam
      corrupti, velit corporis dolor ullam amet. Odit eum nemo non odio dolorem.
    </div>
  );
};

export default Home;
