import { useAuth } from "../context/AuthProvider";

function Dashboard() {
  const { profile, isAuthenticated } = useAuth();
  console.log(profile);
  console.log(isAuthenticated);
  return (
    <div>
     Dashboard
    </div>
  );
}

export default Dashboard;