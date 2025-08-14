import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';
import {getVersion} from 'react-native-device-info';

import {Console} from '../utils/Console';
import {API} from '../types/Api';

const baseURL = 'https://watch-pal-api.vercel.app';

// const fetchApiUrl = async () => {
//   try {
//     const response = await fetch('http://192.168.0.159:3000/projetos/listar', {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     console.log('response.status', response);

//     if (!response.ok) {
//       throw new Error(`Erro ${response.status}: ${response.statusText}`);
//     }

//     const json = await response.json();

//     if (json?.error) {
//       Alert.alert('Erro de versão', json?.error, [
//         {
//           text: 'OK',
//           onPress: () => {},
//         },
//       ]);
//     }

//     return json?.url;
//   } catch (error) {
//     console.error('Erro ao carregar dados:', error);
//     Alert.alert('Erro', 'Falha ao carregar dados', [
//       {
//         text: 'OK',
//         onPress: () => {},
//       },
//     ]);
//   }
// };
async function get<T>(url: string, log?: boolean): Promise<API<T>> {
  const token = JSON.parse(
    (await AsyncStorage.getItem('token')) as any,
  ) as string;
  try {
    const API_URL = baseURL;

    const response = await fetch(API_URL + url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = (await response.json()) as API<T>;
    const _console: any = JSON.stringify({url, data, token}, null, 2);
    if (!data?.success) {
      console.log(_console);
    } else if (log) {
      console.log({token});
      Console(url, {response: data});
    }
    return data;
  } catch (error: any) {
    console.log(JSON.stringify({url, error: String(error), token}, null, 2));
    return {error: String(error), success: false};
  }
}

async function post<T>(url: string, body: any, log?: boolean): Promise<API<T>> {
  const token = JSON.parse(
    (await AsyncStorage.getItem('token')) as any,
  ) as string;
  try {
    const API_URL = baseURL;
    const response = await fetch(API_URL + url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    const data = (await response.json()) as API<T>;

    const _console: any = JSON.stringify({url, body, data, token}, null, 2);
    if (!data?.success && !url.includes('token')) {
      console.log('_console:', _console);
      console.log({token});
    } else if (log) {
      console.log({token});
      Console(url, {body, response: data});
    }

    return data;
  } catch (error: any) {
    console.log(
      JSON.stringify({url, body, error: String(error), token}, null, 2),
    );
    return {error: String(error), success: false};
  }
}
async function form<T>(
  url: string,
  body: any,
  log?: boolean,
  tempToken?: string,
): Promise<API<T>> {
  const token =
    tempToken ||
    (JSON.parse((await AsyncStorage.getItem('token')) as string) as string);

  try {
    const API_URL = baseURL;

    const requestOptions: RequestInit = {
      method: 'POST',
      body: body,
      headers: {
        Accept: '*/*',
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(API_URL + url, requestOptions);

    if (!response.ok) {
      // throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = (await response.json()) as API<T>;

    if (!data?.success) {
      console.log(JSON.stringify({url, body, data, token}, null, 2));
    } else if (log) {
      console.log({log});
      Console(url, {body, response: data});
    }

    return data;
  } catch (error) {
    console.log(
      JSON.stringify({url, body, error: String(error), token}, null, 2),
    );
    return {error: String(error), success: false};
  }
}

// Function to make a PUT request using Fetch
async function put<T>(url: string, body?: any, log?: boolean): Promise<API<T>> {
  const time = Date.now();
  const token = JSON.parse(
    (await AsyncStorage.getItem('token')) as any,
  ) as string;
  try {
    const API_URL = baseURL;

    const response = await fetch(API_URL + url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
        Authorization: `Bearer ${token}`,
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = (await response.json()) as API<T>;
    //
    const _console: any = JSON.stringify({url, body, data, token}, null, 2);
    if (!data?.success) {
      console.log(_console);
    } else if (log) {
      console.log({token});
      Console(url, {body, response: data});
    }
    return data;
  } catch (error: any) {
    console.log(
      JSON.stringify({url, body, error: String(error), token}, null, 2),
    );
    return {error: String(error), success: false};
  }
}

// Function to make a DELETE request using Fetch
async function remove<T>(url: string, log: boolean = false): Promise<API<T>> {
  const time = Date.now();
  const token = JSON.parse(
    (await AsyncStorage.getItem('token')) as any,
  ) as string;
  try {
    const API_URL = baseURL;

    const response = await fetch(API_URL + url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const data = (await response.json()) as API<T>;

    const _console: any = JSON.stringify({url, data, token}, null, 2);
    if (!data?.success) {
      console.log(_console);
    } else if (log) {
      console.log({token});
      Console(url, {response: data});
    }
    return data;
  } catch (error: any) {
    console.log(JSON.stringify({url, error: String(error), token}, null, 2));
    return {error: String(error), success: false};
  }
}

const api = {
  get,
  post,
  form,
  put,
  remove,
};

export {api};
