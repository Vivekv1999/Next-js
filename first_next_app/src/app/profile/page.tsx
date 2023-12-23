"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function page() {
  const router = useRouter();
  const [user, setUSer] = useState("");

  useEffect(() => {
    getUserDetail();
  }, []);

  const getUserDetail = () => {
    axios
      .get("/api/users/me")
      .then((res) => {
        console.log(res.data);
        setUSer(res.data.userData.userName);
        toast.success(res.data.message);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });
  };

  const logOut = () => {
    try {
      const response = axios.get("/api/users/logout");
      toast.success("Logout Sucessfully");
      router.push("/login");
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };
  return (
    <div>
      <div className="mt-4 mr-5 py-2 px-3 ">
        <div>
          <div className="py-2 inline-block	pt-3 text-white text-lg">
            {user !== "" && (
              <Link href={`profile/${user}`}>{user || "Nothing"}</Link>
            )}
          </div>
          <div className="flex justify-end">
            <button
              className="bg-slate-300 text-black py-2 px-3 rounded-sm hover:bg-white"
              onClick={logOut}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center min-h-screen py-2 h-full">
        <h1>Profile</h1>
        <hr />
        <p>Profile page</p>
      </div>
    </div>
  );
}
