import React from "react";
import styles from "./users.module.css";

let Users = (props) => {
  if (props.users.length === 0) {
    props.setUsers([
      {
        id: 1,
        photoUrl: "https://econet.ru/media/video_covers/9535/original.jpg",
        followed: false,
        fullName: "Vadim",
        status: "athlete",
        location: { city: "Vnukovo", country: "Russia" },
      },
      {
        id: 2,
        photoUrl: "https://econet.ru/media/video_covers/9535/original.jpg",
        followed: false,
        fullName: "Roman",
        status: "тоже athlete",
        location: { city: "Vereya", country: "Russia" },
      },
      {
        id: 3,
        photoUrl: "https://econet.ru/media/video_covers/9535/original.jpg",
        followed: true,
        fullName: "Lokus",
        status: "no breed",
        location: { city: "Moscow", country: "Russia" },
      },
    ]);
  }

  return (
    <div>
      {props.users.map((u) => (
        <div key={u.id}>
          <span>
            <div>
              <img src={u.photoUrl} className={styles.userPhoto} alt="ava" />
            </div>
            <div>
              {u.followed ? (
                <button
                  onClick={() => {
                    props.unfollow(u.id);
                  }}
                >
                  Unfollow
                </button>
              ) : (
                <button
                  onClick={() => {
                    props.follow(u.id);
                  }}
                >
                  Follow
                </button>
              )}
            </div>
          </span>
          <span>
            <span>
              <div>{u.fullName}</div>
              <div>{u.status}</div>
            </span>
            <span>
              <div>{u.location.country}</div>
              <div>{u.location.city}</div>
            </span>
          </span>
        </div>
      ))}
    </div>
  );
};

export default Users;
