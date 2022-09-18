export const testFunctionGet = async (paramUrl, paramMensaje, paramStatus, paramApi, paramHeaders, paramDebug = false) => {
  await test(paramMensaje, async () => {
    let response;
    if (!paramHeaders) {
      response = await paramApi.get(paramUrl);
    } else {
      response = await paramApi.get(paramUrl).set(paramHeaders);
    }
    expect(response.statusCode).toEqual(paramStatus);
    expect(response.type).toEqual("application/json");

    if (paramDebug) {
      const bodyResponse = response.body;
      console.log(bodyResponse);
    }
  });
};

export const testFunctionPost = async (paramUrl, paramMensaje, paramSend, paramStatus, paramApi, paramHeaders, paramDebug = false) => {
  await test(paramMensaje, async () => {
    let response;

    if (!paramHeaders) {
      response = await paramApi.post(paramUrl);
    } else {
      response = await paramApi.post(paramUrl).set(paramHeaders)
        .set("content-type", "application/json")
        .send(paramSend);
    }
    // console.log(response);
    expect(response.statusCode).toEqual(paramStatus);
    expect(response.type).toEqual("application/json");

    if (paramDebug) {
      const bodyResponse = response.body;
      console.log(bodyResponse);
    }
  });
};

export const testFunctionPut = async (paramUrl, paramMensaje, paramSend, paramStatus, paramApi, paramHeaders, paramDebug = false) => {
  await test(paramMensaje, async () => {
    let response;
    if (!paramHeaders) {
      response = await paramApi.put(paramUrl);
    } else {
      response = await paramApi.put(paramUrl).set(paramHeaders)
        .set("content-type", "application/json")
        .send(paramSend);
    }
    expect(response.statusCode).toEqual(paramStatus);
    expect(response.type).toEqual("application/json");
    if (paramDebug) {
      const bodyResponse = response.body;
      console.log(bodyResponse);
    }
  });
};

export const testFunctionDelete = async (paramUrl, paramMensaje, paramStatus, paramApi, paramHeaders, paramDebug = false) => {
  await test(paramMensaje, async () => {
    let response;
    if (!paramHeaders) {
      response = await paramApi.delete(paramUrl);
    } else {
      response = await paramApi.delete(paramUrl).set(paramHeaders);
    }
    expect(response.statusCode).toEqual(paramStatus);
    expect(response.type).toEqual("application/json");

    if (paramDebug) {
      const bodyResponse = response.body;
      console.log(bodyResponse);
    }
  });
};
