type PropTypes = {
     username: string
     email?: string
}

const CommentTitle = ({ username, email }: PropTypes) => {
     return (
          <>
               <div style={{ color: "#555" }}>@{username}</div>
               <div style={{
                    color: "#888",
                    fontWeight: "normal",
               }}>
                    {email}
               </div>
          </>
     );
};


export default CommentTitle