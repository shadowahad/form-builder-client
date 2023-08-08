import toast from "react-hot-toast";

export const errorHandle = (error: Error, navigate: (url: string) => void): void => {
  if (error.toString() === "Error: Request failed with status code 401") {
    localStorage.clear();
    navigate("/login");
  } else {
    toast.error("Something went wrong!");
  }
};
