import $$ from "../lib/utils";

const formData = {
  slack: {
    HUBOT_NAME: {
      type: 'text',
      title: 'Bot name:',
      placeholder: 'Enter a bot name.',
      tip: 'Bot name must be shorter than 80 characters, and can’t use punctuation (other than apostrophes and periods).',
      test: function (value) {
        return /^.{1,80}$/.test(value);
      },
      value: ""
    },
    HUBOT_REST_API_USERNAME: {
      type: 'text',
      placeholder: 'Enter a username for the REST API.',
      tip: 'A username for the REST API 35 character limit.',
      test: function (value) {
        return /^.{1,35}$/.test(value);
      },
      title: 'Username for the REST API:',
      value: ""
    },
    HUBOT_REST_API_PASSWORD_VAULT_KEY: {
      type: 'password',
      placeholder: 'Enter a password  for the REST API.',
      tip: 'A password for the REST API is required.',
      title: 'User password for the REST API:',
      value: ""
    },
    HUBOT_SLACK_APP_CLIENT_ID: {
      type: 'text',
      test: function (value) {
        return /^[0-9]{12}\.[0-9]{12}$/.test(value);
      },
      title: 'Client ID for the Slack APP:',
      placeholder: 'Enter the client ID for the Slack APP (e.g.:xxxxxxxxxxxx.xxxxxxxxxxxx).',
      tip: 'Enter the client ID for the Slack APP with a correct format.',
      value: ""
    },
    HUBOT_SLACK_APP_SECRET_VAULT_KEY: {
      type: 'password',
      test: function (value) {
        if (value.endsWith('_vault_key')) {
          return true;
        }
        return /^[A-Za-z0-9]{32}$/.test(value);
      },
      title: 'Slack APP secret:',
      placeholder: 'Enter the Slack APP secret (e.g.:xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx).',
      tip: 'Enter the Slack APP secret with a correct format.',
      value: ""
    },
    HUBOT_SLACK_APP_TEAM_NAME: {
      type: 'text',
      title: 'Subdomain of your Slack team:',
      placeholder: 'Enter the subdomain of your Slack team (e.g.:myteam in myteam.slack.com).',
      tip: 'A subdomain of your Slack team is required.',
      value: ""
    },
    HUBOT_SLACK_APP_TEAM_USERNAME: {
      type: 'text',
      test: function (value) {
        return /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/.test(value);
      },
      title: 'Slack username(Must be an admin):',
      placeholder: 'Enter a Slack username with admin permission (e.g.:dev@microfocus.com).',
      tip: 'A Slack username with admin permission is required.',
      value: ""
    },
    HUBOT_SLACK_APP_TEAM_USERPASS_VAULT_KEY: {
      type: 'password',
      title: 'Slack user password:',
      placeholder: 'Enter the password for the Slack user.',
      tip: 'A password for the Slack user is required.',
      value: ""
    },
    // SLACK_OAUTH_REDIRECT_URL: {
    //   type: 'text',
    //   title: 'Slack OAUTH redirect url:',
    //   value: ""
    // },
    ENABLE_RASA_NLU: {
      type: 'text',
      value: 'yes',
      test: function (value) {
        return /^(yes|no)$/.test(value);
      },
      title: 'Do you want to use RASA NLU (yes/no)?:',
      tip: 'Input yes or no',
    }
    // SUITE_TENANT_ID: {
    //   type: 'text',
    //   title: 'Suite tenant id:',
    //   tip: "Suite tenant id is optional.",
    //   required: false,
    //   value: ""
    // }
  },
  mattermost: {
    HUBOT_NAME: {
      type: 'text',
      title: 'Bot name:',
      placeholder: 'Enter a bot name.',
      test: function (value) {
        return /^[A-Za-z]([a-z0-9.-_]{2,21})$/.test(value);
      },
      tip: 'Bot name must begin with a letter, and contain between 3 to 22 lowercase characters made up of numbers, letters, and the symbols \'.\', \'-\' and \'_\'.',
      value: ''
    },
    HUBOT_REST_API_USERNAME: {
      type: 'text',
      placeholder: 'Enter a username for the REST API.',
      tip: 'A username for the REST API 35 character limit.',
      test: function (value) {
        return /^.{1,35}$/.test(value);
      },
      title: 'Username for the REST API:',
      value: ""
    },
    HUBOT_REST_API_PASSWORD_VAULT_KEY: {
      type: 'password',
      placeholder: 'Enter a password  for the REST API.',
      tip: 'A password for the REST API is required.',
      title: 'User password for the REST API:',
      value: ""
    },
    MATTERMOST_HOST: {
      type: 'text',
      test: function (value) {
        return /^(([0-9]{1,3}\.){3}[0-9]{1,3}|([0-9A-Za-z_!~*'()-]+\.)*([0-9A-Za-z][0-9A-Za-z-]{0,61})?[0-9A-Za-z]\.[a-z]{2,6})$/.test(value);
      },
      title: 'Mattermost server host:',
      placeholder: 'Enter an IPv4 address or a full qualified domain name(FQDN) for the Mattermost server host.',
      tip: 'A Mattermost server host is required.',
      value: ""
    },
    MATTERMOST_HTTP_PORT: {
      type: 'text',
      test: function (value) {
        return /^([1-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/.test(value);
      },
      title: 'Mattermost server port(80/443):',
      placeholder: 'Enter a Mattermost server port. The value is between 1 and 65535.',
      tip: 'A Mattermost server port (between 1 and 65535) is required.',
      value: ""
    },
    MATTERMOST_WSS_PORT: {
      type: 'text',
      test: function (value) {
        return /^([1-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/.test(value);
      },
      title: 'Mattermost WSS port:',
      placeholder: 'Enter a Mattermost WSS port. The value is between 1 and 65535.',
      tip: 'A Mattermost WSS port (between 1 and 65535) is required.',
      value: ""
    },
    MATTERMOST_GROUP: {
      type: 'text',
      test: function (value) {
        return /[\w]{2,}/.test(value);
      },
      title: 'Mattermost team name:',
      placeholder: 'Enter the Mattermost team name. The length of the name is no shorter than 2 characters.',
      tip: 'A Mattermost team name is required.',
      value: ""
    },
    MATTERMOST_USER: {
      type: 'text',
      title: 'Mattermost bot username:',
      placeholder: 'Enter a Mattermost bot username.',
      tip: 'A Mattermost bot username is required.',
      value: ""
    },
    MATTERMOST_PASSWORD_VAULT_KEY: {
      type: 'password',
      title: 'Mattermost bot password:',
      placeholder: 'Mattermost bot password.',
      tip: 'A password for Mattermost bot is required.',
      value: ""
    },
    MATTERMOST_USE_TLS: {
      type: 'text',
      value: 'yes',
      test: function (value) {
        return /^(yes|no)$/.test(value);
      },
      title: 'Do you want to use TLS (yes/no):',
      tip: 'Input yes or no'
    },
    MATTERMOST_TLS_VERIFY: {
      type: 'text',
      value: 'no',
      test: function (value) {
        return /^(yes|no)$/.test(value);
      },
      title: 'Do you want to verify TLS (yes/no):',
      tip: 'Input yes or no'
    },
    ENABLE_RASA_NLU: {
      type: 'text',
      value: 'yes',
      test: function (value) {
        return /^(yes|no)$/.test(value);
      },
      title: 'Do you want to use RASA NLU (yes/no)?:',
      tip: 'Input yes or no',
    }
    // SUITE_TENANT_ID: {
    //   type: 'text',
    //   title: 'Suite tenant id:',
    //   tip: "Suite tenant id is optional.",
    //   required: false,
    //   value: ""
    // }
  },
  msteams: {
    HUBOT_NAME: {
      type: 'text',
      title: 'Bot name:',
      placeholder: 'Enter a bot name.',
      tip: 'Your bot\'s name is 35 character limit.',
      test: function (value) {
        return /^.{1,35}$/.test(value);
      },
      value: ""
    },
    HUBOT_REST_API_USERNAME: {
      type: 'text',
      placeholder: 'Enter a username for the REST API.',
      tip: 'A username for the REST API 35 character limit.',
      test: function (value) {
        return /^.{1,35}$/.test(value);
      },
      title: 'Username for the REST API:',
      value: ""
    },
    HUBOT_REST_API_PASSWORD_VAULT_KEY: {
      type: 'password',
      placeholder: 'Enter a password  for the REST API.',
      tip: 'A password for the REST API is required.',
      title: 'User password for the REST API:',
      value: ""
    },
    MICROSOFT_APP_ID: {
      type: 'text',
      test: function (value) {
        return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(value);
      },
      title: 'Microsoft APP ID:',
      placeholder: 'Enter a Microsoft APP ID (e.g.:xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx).',
      tip: 'Enter the Microsoft APP ID with a correct format.',
      value: ""
    },
    MICROSOFT_APP_PASSWORD_VAULT_KEY: {
      type: 'password',
      title: 'Microsoft APP password:',
      placeholder: 'Enter the Microsoft APP password.',
      tip: 'A Microsoft APP password is required.',
      value:''
    },
    MICROSOFT_AUTH_SERVER_HOST: {
      type: 'text',
      test: function (value) {
        return /^(https|http):\/\/[^\s]*/.test(value);
      },
      title: 'Microsoft authentication server endpoint:',
      placeholder: 'Enter the Microsoft authentication server endpoint (e.g.:https://hostname:port).',
      tip: 'Enter the Microsoft authentication server endpoint with a correct format.',
      value: ''
    },
    MICROSOFT_TENANT_ID_VAULT_KEY: {
      type: 'password',
      test: function (value) {
        if (value.endsWith('_vault_key')) {
          return true;
        }
        return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(value);
      },
      title: 'Microsoft tenant ID:',
      placeholder: 'Enter the Microsoft tenant ID (e.g.:xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx).',
      tip: 'Enter the Microsoft tenant ID with a correct format.',
      value: ""
    },
    ENABLE_RASA_NLU: {
      type: 'text',
      value: 'yes',
      test: function (value) {
        return /^(yes|no)$/.test(value);
      },
      title: 'Do you want to use RASA NLU (yes/no)?:',
      tip: 'Input yes or no',
    }
    // SUITE_TENANT_ID: {
    //   type: 'text',
    //   title: 'Suite tenant id:',
    //   tip: "Suite tenant id is optional.",
    //   required: false,
    //   value: ""
    // }
  }
};

export function getDefaultFormData() {
  return $$.extend(true, {}, formData);
}