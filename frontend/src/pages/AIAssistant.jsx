import {
  useState
} from 'react';

import axios from 'axios';

function AIAssistant() {

  const [message, setMessage] =
    useState('');

  const [messages, setMessages] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  async function askAI() {

    if (!message.trim()) {
      return;
    }

    const userMessage =
      message;

    try {

      setLoading(true);

      setMessage('');

      const response =
        await axios.post(

          'http://localhost:5000/api/ai/chat',

          {
            message: userMessage
          }

        );

      setMessages((prev) => [

        ...prev,

        {
          type: 'user',
          text: userMessage
        },

        {
          type: 'ai',
          text: response.data.reply
        }

      ]);

    }

    catch (error) {

      console.log(error);

      setMessages((prev) => [

        ...prev,

        {
          type: 'user',
          text: userMessage
        },

        {
          type: 'ai',
          text: 'AI Error. Please try again.'
        }

      ]);

    }

    finally {

      setLoading(false);

    }

  }

  return (

    <div className="ai-page">

      <div className="ai-container">

        <h1>
          🤖 Airbnb AI Assistant
        </h1>

        <p className="ai-subtitle">

          Ask for recommendations,
          budget stays,
          locations and more.

        </p>

        <textarea

          className="ai-input"

          placeholder="Ask me about available properties..."

          value={message}

          onChange={(event) =>

            setMessage(
              event.target.value
            )

          }

        />

        <button

          className="ai-btn"

          onClick={askAI}

        >

          Ask AI

        </button>

        {

          loading && (

            <p className="loading">

              Thinking...

            </p>

          )

        }

        <div className="chat-container">

          {

            messages.map(

              (msg, index) => (

                <div

                  key={index}

                  className={

                    msg.type === 'user'

                      ? 'user-message'

                      : 'ai-message'

                  }

                >

                  <strong>

                    {

                      msg.type === 'user'

                        ? '👤 You'

                        : '🤖 AI Assistant'

                    }

                  </strong>

                  <div>

                    {

                      msg.text

                        .split('\n')

                        .map(

                          (line, i) => (

                            <p key={i}>

                              {line}

                            </p>

                          )

                        )

                    }

                  </div>

                </div>

              )

            )

          }

        </div>

      </div>

    </div>

  );

}

export default AIAssistant;