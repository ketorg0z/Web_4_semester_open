<link rel="preconnect" href="https://fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;700&display=swap" rel="stylesheet">

<script>
  import {createSmartappDebugger, createAssistant} from '@sberdevices/assistant-client'
  import { onMount } from 'svelte'

  let message = '';
  const backendUrl = 'http://localhost:3000/'
  let wordsState = []
  let idState
  let token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhMzM2YmEwMjU3MzEyN2RkMDY1MmYxNDRmZDI5NmQwNWViNmIyZTk5MTJhMmVlMDQ5NzAyMWE4ZGE0NDVjM2E5NTM5YmU5MjcwMDQyNjI5OCIsImF1ZCI6IlZQUyIsImV4cCI6MTYyMTg2ODI0NiwiaWF0IjoxNjIxNzgxODM2LCJpc3MiOiJLRVlNQVNURVIiLCJ0eXBlIjoiQmVhcmVyIiwianRpIjoiYjAxMTgyOTgtYmNmMy00ZTcwLTlmNDEtMzVhNjM4ZDFjNDIwIiwic2lkIjoiNzg3MmEzMDUtMDBjOS00YjJmLTg0NWEtMmM5MGIyMTczNDY1In0.fIGElH3srs9KjkWP5jg6HLhQV9Zugj33sxtnyIxKmgSES1lAPpjGb9ttsFnym9tx5ghMQLvbYkt2k0-mSgVm-24tv-4lYUB3AimZlgqGN-DcaNNH3Ow0bonXdV6wO1eY96EC8taI6todRLstSi7O9yxqb6t6ayEB02LvZmTpEGwngX7IUoJ5l7seMJCyw2_D66vp5Y-64gto-KzcgSXEmR30vU81p0yFwttQxhSuMCHFZZcMA6BUeMHI0BKg3Q9A2sV_yvtVwGoufJLPrhIoS3ErTKcLKZ2kFahwH2vGMzVsZSFBeXRupJX-mtUK9ukV3k2g-58EUuk8zOTTzCIUQnoaE0behiVGyL6W3DZaZa65aQ3xw3j3umR3djzYITzwwGINoG_4EaDd_mrSqLjLINjRqiHK9hIuRd0b2IHdavYSQP9838zsatpURlCzN7IEw28EX3BPH-k3eJ1j_l2BxcBXksTdFnWgskRShd0q8Ykbo0YUcYUIK2ShUzdRaqhNkV2GbPLIJZrjzYpVNTA-90oRXLGmTjpfJLcdO9ROrolKlt0oHCT2c-B-TcV1PTjtCFzp04JWe6ESx7XH6pC9gb3nxrHXbVGXkG-Z1qfh2jb3EHFi2cbtITtC_xK_gBQVHSMIGp4vOzGk9oMse__NTqBFdxl3O0SHe0ZzX_c7lp0';
  let initPhrase = 'Включи переводчик'; // <- сюда вставляем активационную фразу своего canvas app

  function getState() {
    console.log("State was get");
    const state = {
      item_selector: {
        items: [
          {rightId: idState},
          {
            words: wordsState
          }
        ],
      }
    }
    console.log(state)
    return state;
  }

  let assistant;
  onMount(() => {
    const init = () => {
      return createSmartappDebugger({
        token,
        initPhrase,
        getState,
        settings: {debugging: false}
      })
      // return createAssistant({getState});
    }
    assistant = init();

    assistant.on("start", (event) => {
      console.log(`assistant.on(start)`, event);
    });

    assistant.on("data", (event) => {
      console.log('EVENT!!!', event);
      switch (event.action.type) {
        case 'answer':
          if (wordsState[idState] === event.action.word) {
            message = '';
            promise = newGame();
          } else {
            message = 'Неверно, подумай еще раз.'
          }
        break
      }
    });
  })

  function check(ind, rightInd) {
    if (ind === rightInd) {
      message = '';
      promise = newGame();
    } else {
      message = 'Неверно, подумай еще раз.'
    }
  }

  const newGame = async () => {
    const response = await fetch(backendUrl+'game');
    if (response.ok) {
      const json = await response.json();
      wordsState = json.words;
      idState = json.trueIndex;
      return json;
    } else {
      return {trueWord: 'Ошибка сервера'}
    }
  }

  let promise = newGame();
</script>

<main>
  <div id="game">
    {#await promise then game}
      <h1>{game.trueWord}</h1>
      <div id="words-block">
        {#each game.words as word, i}
          <button on:click={() => check(i, game.trueIndex)}>{word}</button>
        {/each}
      </div>
      <div id="message">
        <p>{message}</p>
      </div>
    {/await}
  </div>
</main>

<style>
	main {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1 1;
    font-family: 'Montserrat', sans-serif;
    background-color: #3c3c3c;
    color: #FFFFFF;
	}

	#game {
    position: relative;
    text-align: center;
    padding-bottom: 50px;
  }

  #words-block {
    min-width: 300px;
    display: flex;
    justify-content: center;
    flex: 1 1;
    margin-top: 40px;
    flex-wrap: wrap;
  }

  #words-block button {
    width: 250px;
    min-width: 100px;
    cursor: pointer;
    margin: 10px 20px;
    padding: 20px;
    border-radius: 20px;
  }

  #message {
    width: 100%;
    position: absolute;
    bottom: 0;
    color: red;
    text-align: center;
  }

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>