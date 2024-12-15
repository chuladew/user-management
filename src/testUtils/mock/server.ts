import { http, HttpHandler, HttpRequestHandler, HttpResponse } from "msw";
import { setupServer } from "msw/node";

const users = [
  {
    firstName: "Fredra",
    lastName: "Filippov",
    age: 70,
    gender: "Female",
    email: "ffilippov1@epa.gov",
    country: "Indonesia",
    id: "2",
  },
  {
    firstName: "Mariele",
    lastName: "Lorent",
    age: 58,
    gender: "Female",
    email: "mlorent2@edublogs.org",
    country: "Mexico",
    id: "3",
  },
  {
    firstName: "Humfrey",
    lastName: "Witch",
    age: 54,
    gender: "Male",
    email: "hwitch3@pinterest.com",
    country: "Sweden",
    id: "4",
  },
  {
    firstName: "Cort",
    lastName: "Capehorn",
    age: 94,
    gender: "Agender",
    email: "ccapehorn4@uol.com.br",
    country: "Iran",
    id: "5",
  },
  {
    firstName: "Alasteir",
    lastName: "Charpling",
    age: 80,
    gender: "Male",
    email: "acharpling5@com.com",
    country: "Poland",
    id: "6",
  },
  {
    firstName: "Vinny",
    lastName: "Stiff",
    age: 40,
    gender: "Male",
    email: "vstiff6@about.me",
    country: "Brazil",
    id: "7",
  },
  {
    firstName: "Monro",
    lastName: "Harbar",
    age: 60,
    gender: "Male",
    email: "mharbar7@live.com",
    country: "Tanzania",
    id: "8",
  },
  {
    firstName: "Ulrich",
    lastName: "Chittim",
    age: 22,
    gender: "Male",
    email: "uchittim8@ovh.net",
    country: "Canada",
    id: "9",
  },
  {
    firstName: "Myrvyn",
    lastName: "Medgewick",
    age: 54,
    gender: "Male",
    email: "mmedgewick9@list-manage.com",
    country: "China",
    id: "10",
  },
  {
    firstName: "Blithe",
    lastName: "Tewkesbury.",
    age: 46,
    gender: "Female",
    email: "btewkesburya@forbes.com",
    country: "China",
    id: "11",
  },
  {
    firstName: "Carie",
    lastName: "Quye",
    age: 71,
    gender: "Female",
    email: "cquyeb@tinypic.com",
    country: "Poland",
    id: "12",
  },
  {
    firstName: "Andy",
    lastName: "Torrie",
    age: 83,
    gender: "Male",
    email: "atorriec@businessinsider.com",
    country: "Philippines",
    id: "13",
  },
  {
    firstName: "Dare",
    lastName: "Ball",
    age: 89,
    gender: "Male",
    email: "dballd@edublogs.org",
    country: "Brazil",
    id: "14",
  },
  {
    firstName: "Lyda",
    lastName: "De Ortega",
    age: 82,
    gender: "Female",
    email: "ldeortegaf@nba.com",
    country: "China",
    id: "16",
  },
  {
    firstName: "Nester",
    lastName: "Yarmouth",
    age: 33,
    gender: "Non-binary",
    email: "nyarmouthg@weebly.com",
    country: "Bolivia",
    id: "17",
  },
  {
    firstName: "Dorree",
    lastName: "Iacomelli",
    age: 23,
    gender: "Female",
    email: "diacomellih@usda.gov",
    country: "France",
    id: "18",
  },
  {
    firstName: "Artemis",
    lastName: "Toffolini",
    age: 21,
    gender: "Male",
    email: "atoffolinii@free.fr",
    country: "Sweden",
    id: "19",
  },
  {
    firstName: "Giacobo",
    lastName: "Sedgemore",
    age: 55,
    gender: "Male",
    email: "gsedgemorej@google.ru",
    country: "Russia",
    id: "20",
  },
];

export const handlers = [
  http.get("http://localhost:3000/users", () => {
    return HttpResponse.json(users);
  }),
  http.post("http://localhost:3000/users", ({ request }) => {
    return new HttpResponse(request.body, {
      status: 200,
    });
  }),
];

export type MockRequest = {
  url: string;
  method: string;
  headers?: any; //Record<string, unknown>;
  response?: any;
  status?: number;
};

export const createHandler = (req: MockRequest) => {
  const { url, method, headers, response, status } = req;
  return http[method.toLowerCase()](url, () => {
    return new HttpResponse(response ?? null, {
      status: status ?? 200,
      headers: headers ?? {},
    });
  });
};

export const setupMockServer = (
  additionalHandlers: HttpHandler[] | undefined = undefined
) => setupServer(...[...handlers, ...(additionalHandlers || [])]);
