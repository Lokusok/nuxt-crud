import { defineI18nConfig } from "#imports";

export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'ru',
  messages: {
    en: {
      nav: {
        indexLink: 'Home',
        usersLink: 'Users',
        createUserLink: 'Create user',
        loginLink: 'Login',
        registerLink: 'Register',
        logoutButton: 'Logout'
      },
      home: {
        headTitle: 'Home page',
        description: `Customer Relationship Management (CRM) is a smart program designed to interact with clients. It collects, systematizes, and stores information about customers, providing a comprehensive understanding of their needs and preferences. A CRM system helps automate sales, marketing, and customer service processes, enabling businesses to build strong, long-term relationships with their clients.`,
        inviteToStats: 'See some stats'
      },
      users: {
        headTitle: 'List of users',
        title: 'List of users',
        searchTitle: 'Search user',
        inputSearchPlaceholder: 'Enter name or email',
        buttonSearch: 'Search',
        columnOption: 'Column',
        gridOption: 'Grid',
        empty: 'Users empty',
        createUserInvite: 'Create here'
      },
      user: {
        headTitle: 'Page of user',
        headTitleInter: 'Page of {username}',
        nameLabel: 'Name',
        emailLabel: 'Email',
        createdLabel: 'Created',
        updatedLabel: 'Last update',
        controls: {
          goBack: 'Go back',
          startEdit: 'Edit this user',
          stopEdit: 'Stop edit',
          startDelete: 'Delete user',
          submitEdit: 'Confirm edit'
        }
      },
      createUser: {
        headTitle: 'Create user',
        title: 'Create user',
        buttonSubmitText: 'Create new user'
      },
      register: {
        headTitle: 'Register page',
        title: 'Register in our system',
        form: {
          name: {
            label: 'Username',
            placeholder: 'Your username'
          },
          password: {
            label: 'Password',
            placeholder: 'Your password'
          },
          passwordConfirm: {
            label: 'Confirm password',
            placeholder: 'Your password'
          },
          submit: 'Register',
          haveAccount: {
            defaultText: 'Already have account?',
            linkText: 'Log in now!'
          }
        }
      },
      login: {
        headTitle: 'Login page',
        title: 'Log in to system',
        form: {
          name: {
            label: 'Username',
            placeholder: 'Your username'
          },
          password: {
            label: 'Password',
            placeholder: 'Your password'
          },
          remember: {
            label: 'Remember me'
          },
          submit: 'Log in',
          notHaveAccount: {
            defaultText: 'Have not account?',
            linkText: 'Register it!'
          }
        }
      },
      stats: {
        title: 'Users and avatars',
        withAvatarsTitle: 'Users with avatars',
        withoutAvatarsTitle: 'Users without avatars'
      },
      components: {
        userForm: {
          name: {
            label: 'Name of user',
            placeholder: 'John',
            errors: {
              required: 'Required field!',
              minLength: 'So small name!'
            }
          },
          email: {
            label: 'Email of user',
            placeholder: "{'john@example.com'}",
            errors: {
              required: 'Required field!',
              notEmail: 'Must be an email!'
            }
          },
          avatar: {
            label: 'Avatar of user',
            text: 'Upload file'
          }
        },
      },
      modals: {
        logout: {
          title: 'Logout?',
          body: 'Are you sure in this action?',
          cancelText: 'Cancel',
          confirmText: 'Confirm'
        },
        userDelete: {
          title: 'Delete user {username}?',
          body: 'Are you sure in this action? User not be recovered!',
          cancelText: 'Cancel',
          confirmText: 'Confirm'
        },
      },
      requests: {
        userCreate: {
          success: 'User successfully created!',
          error: 'Error occured',
          visitLinkText: 'Visit page'
        },
        userUpdate: {
          success: 'User successfully updated!',
          error: 'Error occured'
        },
        userDelete: {
          error: 'Error occured'
        },
        login: {
          error: 'Error occured'
        },
        register: {
          error: 'Error occured'
        }
      },
      admin: {
        headTitle: 'Admin profile',
        titleBeforeName: 'Admin',
        language: {
          select: 'Select active language'
        }
      },
    },
    ru: {
      nav: {
        indexLink: 'Главная',
        usersLink: 'Пользователи',
        createUserLink: 'Создать пользователя',
        loginLink: 'Вход',
        registerLink: 'Регистрация',
        logoutButton: 'Выход'
      },
      home: {
        headTitle: 'Главная страница',
        description: `Управление взаимоотношениями с клиентами (CRM) - это интеллектуальная программа, предназначенная для взаимодействия с клиентами. Она собирает, систематизирует и хранит информацию о клиентах, обеспечивая всестороннее понимание их потребностей и предпочтений. CRM-система помогает автоматизировать процессы продаж, маркетинга и обслуживания клиентов, позволяя компаниям выстраивать прочные и долгосрочные отношения со своими клиентами.`,
        inviteToStats: 'Посмотреть статистику'
      },
      users: {
        headTitle: 'Список пользователей',
        title: 'Список пользователей',
        searchTitle: 'Поиск пользователя',
        inputSearchPlaceholder: 'Введите имя или почту',
        buttonSearch: 'Поиск',
        columnOption: 'Строки',
        gridOption: 'Сетка',
        empty: 'Нет пользователей',
        createUserInvite: 'Создать тут'
      },
      user: {
        headTitle: 'Страница пользователя',
        headTitleInter: 'Страница {username}',
        nameLabel: 'Имя',
        emailLabel: 'Почта',
        createdLabel: 'Создан',
        updatedLabel: 'Последнее обновление',
        controls: {
          goBack: 'Назад',
          startEdit: 'Редактировать',
          stopEdit: 'Отмена редактирования',
          startDelete: 'Удалить',
          submitEdit: 'Подтвердить изменение'
        }
      },
      createUser: {
        headTitle: 'Создать пользователя',
        title: 'Создать пользователя',
        buttonSubmitText: 'Создать нового'
      },
      register: {
        headTitle: 'Регистрация',
        title: 'Регистрация в нашей системе',
        form: {
          name: {
            label: 'Имя',
            placeholder: 'Ваше имя'
          },
          password: {
            label: 'Пароль',
            placeholder: 'Ваш пароль'
          },
          passwordConfirm: {
            label: 'Подтвердите пароль',
            placeholder: 'Ваш пароль'
          },
          submit: 'Регистрация',
          haveAccount: {
            defaultText: 'Уже есть аккаунт?',
            linkText: 'Войдите сейчас!'
          }
        }
      },
      login: {
        headTitle: 'Вход',
        title: 'Вход в систему',
        form: {
          name: {
            label: 'Имя',
            placeholder: 'Ваше имя'
          },
          password: {
            label: 'Пароль',
            placeholder: 'Ваш пароль'
          },
          remember: {
            label: 'Запомнить меня'
          },
          submit: 'Вход',
          notHaveAccount: {
            defaultText: 'Нет аккаунта?',
            linkText: 'Регистрация!'
          }
        }
      },
      stats: {
        headTitle: 'Статистика',
        title: 'Пользователи и их фото',
        withAvatarsTitle: 'Пользователи с фото',
        withoutAvatarsTitle: 'Пользователи без фото'
      },
      components: {
        userForm: {
          name: {
            label: 'Имя пользователя',
            placeholder: 'Иван',
            errors: {
              required: 'Обязательное поле!',
              minLength: 'Слишком короткое имя!'
            }
          },
          email: {
            label: 'Почта пользователя',
            placeholder: "{'ivan@example.ru'}",
            errors: {
              required: 'Обязательное поле!',
              notEmail: 'Должно быть почтой!'
            }
          },
          avatar: {
            label: 'Фото пользователя',
            text: 'Загрузить файл'
          }
        },
      },
      modals: {
        logout: {
          title: 'Выйти?',
          body: 'Вы уверены в этом действии?',
          cancelText: 'Отмена',
          confirmText: 'Подтвердить'
        },
        userDelete: {
          title: 'Удалить пользователя {username}?',
          body: 'Вы уверены в этом действии? Восстановить не получится!',
          cancelText: 'Отмена',
          confirmText: 'Подтвердить'
        }
      },
      requests: {
        userRead: {
          empty: 'Error occured'
        },
        userCreate: {
          success: 'Пользователь успешно создан!',
          error: 'Произошла ошибка',
          visitLinkText: 'Посетить его'
        },
        userUpdate: {
          success: 'Пользователь успешно обновлён!',
          error: 'Произошла ошибка'
        },
        userDelete: {
          error: 'Произошла ошибка'
        },
        login: {
          error: 'Произошла ошибка'
        },
        register: {
          error: 'Произошла ошибка'
        }
      },
      admin: {
        headTitle: 'Личный кабинет',
        titleBeforeName: 'Администратор',
        language: {
          select: 'Выберите активный язык'
        }
      },
    }
  }
}))