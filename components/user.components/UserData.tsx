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
      className="grid grid-cols-2 gap-6 justify-center w-full p-10"
    >
      <div className="p-2">
        <p>
          Nombre de usuario: <span>{user.username}</span> <UpdateUsername />
        </p>
      </div>
      <div className="p-2">
        <p>
          Nombre: <span>{user.name}</span> <UpdateName />
        </p>
      </div>
      <div className="p-2">
        <p>
          Dirección email: <span>{user.email}</span> <UpdateEmail />
        </p>
      </div>
    </div>
  );
};

export default UserData;
