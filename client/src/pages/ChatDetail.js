import React from "react";
import Auth from "../utils/auth";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_CHAT } from "../utils/queries";

function ChatDetail() {
  const { id } = useParams();

  const { loading, data } = useQuery(QUERY_CHAT, { variables: { chatId: id } });
  console.log(data);

  // const user = data?.me ||  {};
  // console.log(user);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        <h2>
          Viewing Chat {data.chat._id} between {data.chat.tutor.username} and{" "}
          {data.chat.student.username}
        </h2>
        <section>
          {data.chat.messages.map((message) => {
            return <p>{message.messageText}</p>;
          })}
        </section>
      </div>

      <div>
        <div></div>
      </div>
    </>
  );
}

export default ChatDetail;
