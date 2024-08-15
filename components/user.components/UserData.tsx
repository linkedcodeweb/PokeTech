import { getUserById } from "@/model/user.data";
import UpdateName from "./UpdateName";
import UpdateUsername from "./UpdateUserame";
import UpdateEmail from "./UpdateEmail";

const UserData = async () => {
  //function editField(field: string) {}
  const user = await getUserById();

  return (
    <div
      key={user.uuid}
      className="grid lg:grid-cols-2 gap-6 lg:justify-center w-full p-10"
    >
      <div className="p-2">
        <p>
          Nombre de usuario: <span>{user.username}</span> 
        </p>
        <UpdateUsername />
      </div>
      <div className="p-2">
        <p>
          Nombre: <span>{user.name}</span> 
        </p>
        <UpdateName />
      </div>
      <div className="p-2">
        <p>
          Dirección email: <span>{user.email}</span> 
        </p>
        <UpdateEmail />
      </div>
    </div>
  );
};

export default UserData;
