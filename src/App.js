import React from "react";
const MeetupContext = React.createContext();
const UserContext = React.createContext();

const initialState = {
  meetup: {
    title: "Auth0 Online Meetup",
    date: Date(),
    attendess: ["Candra", "Mario", "Putra", "Hendra"]
  },
  user: {
    name: "Bhima"
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case "subscribeUser":
      return {
        ...state,
        attendess: [...state.attendess, action.payload],
        subscribed: true
      };
    case "unSubscribeUser":
      return {
        ...state,
        attendess: state.attendess.filter(
          attendee => attendee !== action.payload
        ),
        subscribed: false
      };
    default:
      return state;
  }
};

const MeetupContextProvider = ({ user, ...props }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState.meetup);
  return (
    <MeetupContext.Provider
      value={{
        ...state,
        handleSubscribe: () =>
          dispatch({
            type: "subscribeUser",
            payload: user.name
          }),
        handleUnSubscribe: () =>
          dispatch({
            type: "unSubscribeUser",
            payload: user.name
          })
      }}
    >
      {props.children}
    </MeetupContext.Provider>
  );
};

function App() {
  return (
    <UserContext.Provider value={initialState.user}>
      <UserContext.Consumer>
        {user => (
          <MeetupContextProvider user={user}>
            <MeetupContext.Consumer>
              {meetup => (
                <div>
                  <h1>{meetup.title}</h1>
                  <span>{meetup.date}</span>
                  <div>
                    <h2>{`Attendess ${meetup.attendess.length} People`}</h2>
                    {meetup.attendess.map((attendant,index) => (
                      <li key={index}>{attendant}</li>
                    ))}
                  </div>
                  <p>
                    {!meetup.subscribed ? (
                      <button onClick={meetup.handleSubscribe}>
                        Subscribe
                      </button>
                    ):(
                      <button onClick={meetup.handleUnSubscribe}>
                        unSubscribe
                      </button>
                    )}
                  </p>
                </div>
              )}
            </MeetupContext.Consumer>
          </MeetupContextProvider>
        )}
      </UserContext.Consumer>
    </UserContext.Provider>
  );
}

export default App;
