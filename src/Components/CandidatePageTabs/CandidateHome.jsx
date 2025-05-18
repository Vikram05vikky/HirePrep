import React, { useState, useEffect } from "react";
import { TestTypeData } from "../../helper/mainData";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { selectQuestionType } from "../../reduxSlice/TestType/TestTypeSlice";
import Loader from "../Loader/Loader";
import { toast, ToastContainer } from "react-toastify";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import firebaseApp from "../../Firebase/Firebase";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet";

import Chatbot from "react-chatbot-kit";

import config from "../../Components/Chat-bot/configs";
import MessageParser from "../../Components/Chat-bot/MessageParser";
import ActionProvider from "../../Components/Chat-bot/ActionProvider";

const CandidateHome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = useState(true); // For loader
  const [testId, setTestId] = useState("");
  const [isTestModalOpen, setIsTestModalOpen] = useState(false); // Modal for Test ID
  const [isChatbotOpen, setIsChatbotOpen] = useState(false); // Chatbot toggle
   const [chatMessages, setChatMessages] = useState(config.initialMessages);
   

  useEffect(() => {
    console.log("chatMessages updated:", chatMessages);
    const timer = setTimeout(() => {
      setOpen(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handelSelect = (type) => {
    dispatch(selectQuestionType(type));
    navigate("/user/test");
  };

  const fetchCustomTest = async (testId) => {
    try {
      const db = getFirestore(firebaseApp);
      const activeTestsCollection = collection(db, "ActiveTests");
      const querySnapshot = await getDocs(activeTestsCollection);
      const activeTestsData = querySnapshot.docs.map((doc) => ({
        uniqueId: doc.id,
        ...doc.data(),
      }));
      const customType = activeTestsData.find(
        (data) => data.uniqueId === testId
      );

      if (!customType) {
        toast.error("Invalid Test ID");
        return;
      }

      dispatch(selectQuestionType(customType.type));
      navigate("/user/test");
    } catch (error) {
      console.error("Error fetching active tests:", error);
      toast.error("Error fetching test data");
    }
  };

  const handelStartTest = () => {
    if (testId.trim() === "") {
      toast.error("Enter Your Test ID");
    } else {
      fetchCustomTest(testId.trim());
    }
  };

  const toggleModal = () => {
    setIsTestModalOpen((prev) => !prev);
  };

  const toggleChatbot = () => {
    setIsChatbotOpen((prev) => !prev);
  };

  return (
    <>
      <Helmet>
        <title>Test Type</title>
      </Helmet>

      {open ? (
        <Loader />
      ) : (
        <div className="lg:px-60 px-10 md:px-20 py-8">
          <div className="flex flex-col justify-center items-center">
            <div>
              <h1 className="font-semibold text-3xl">Different Test Types</h1>
              <p className="py-1 text-light text-gray-500">
                Combine these tests into a single assessment based on the role.
                Then, share the assessment with your candidates.
              </p>
            </div>

            <div className="test-type grid md:grid-cols-2 gap-10 mt-6">
              {TestTypeData.map((e) => (
                <div
                  className="group p-4 cursor-pointer bg-gray-100 rounded grid md:grid-cols-6 items-center gap-4 border-2 border-transparent hover:border-gray-200"
                  key={e.id}
                  onClick={() => handelSelect(e.type)}
                >
                  <div className="col-span-3">
                    <img
                      src={e.image}
                      alt=""
                      className="rounded w-full h-full lg:w-10/12 object-left-top object-cover mx-auto"
                    />
                  </div>
                  <div className="col-span-3">
                    <h1 className="text-lg font-semibold leading-6 text-gray-900">
                      {e.type}
                    </h1>
                    <p className="text-gray-500 py-2">{e.description}</p>

                    <p className="text-green-600 cursor-pointer flex items-center">
                      Try Now <KeyboardArrowRightIcon />
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* <button
              onClick={toggleModal}
              className="mt-8 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              Enter Custom Test ID
            </button> */}
          </div>
        </div>
      )}

      {/* Test ID Modal */}
      {isTestModalOpen && (
        <div
          id="popup-modal"
          tabIndex="-1"
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
        >
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 p-6 w-96 max-w-full">
            <div className="text-center">
              <h3 className="mb-5 text-lg font-normal text-gray-700 dark:text-gray-300">
                Please check your Email
              </h3>

              <input
                className="w-full my-5 px-4 py-3 rounded-lg font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white"
                type="text"
                autoComplete="off"
                placeholder="Enter Your Test ID"
                value={testId}
                onChange={(e) => setTestId(e.target.value)}
              />

              <div className="flex justify-center gap-4">
                <button
                  onClick={handelStartTest}
                  type="button"
                  className="bg-indigo-800 hover:bg-indigo-700 text-white font-medium rounded-lg text-sm px-5 py-2.5"
                >
                  Start Test
                </button>
                <button
                  onClick={toggleModal}
                  type="button"
                  className="py-2.5 px-5 text-gray-900 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 hover:text-indigo-700 focus:outline-none focus:ring-4 focus:ring-gray-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
          <ToastContainer position="top-right" autoClose={5000} theme="dark" />
        </div>
      )}

      {/* Chatbot toggle button */}
      <button
        onClick={toggleChatbot}
        aria-label="Toggle Chatbot"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-indigo-600 hover:bg-indigo-700 rounded-full shadow-lg flex items-center justify-center text-white text-2xl"
      >
        💬
      </button>

      {/* Chatbot container */}
      {isChatbotOpen && (
  <div
    style={{
      position: "fixed",
      bottom: "80px",
      right: "24px",
      zIndex: 50,
      width: "320px",
      height: "500px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
      borderRadius: "12px",
      backgroundColor: "white",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
    }}
  >
    <div
      style={{
        flex: 1,
        padding: "12px",
        overflowY: "auto",  // scroll happens here
      }}
    >
      <Chatbot
        config={config}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
      />
    </div>
  </div>
)}


    </>
  );
};

export default CandidateHome;
  