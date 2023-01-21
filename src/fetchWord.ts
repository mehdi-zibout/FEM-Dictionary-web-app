const fetchWord = async ({ queryKey }) => {
  console.log("ahhm", queryKey);
  const word = queryKey[0];
  const apiRes = await fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
  );

  if (!apiRes.ok) {
    throw new Error(`en/${word} fetch not ok`);
  }

  return apiRes.json();
};

export default fetchWord;
