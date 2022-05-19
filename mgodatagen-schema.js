;[
  {
    collection: 'dictionary',
    count: 20,
    content: {
      _id: {
        type: 'object',
        objectContent: {
          oid: {
            type: 'uuid',
          },
        },
      },
      idGloss: {
        type: 'faker',
        method: 'Word',
      },
      annotationIdGloss: {
        type: 'faker',
        method: 'Word',
      },
      aslLoan: {
        type: 'enum',
        in: [true, false],
        randomOrder: true,
        nullPercentage: 30,
      },
      bslLoan: {
        type: 'enum',
        in: [true, false],
        randomOrder: true,
        nullPercentage: 30,
      },
      dominantHandshape: {
        type: 'object',
        objectContent: {
          inital: {
            type: 'enum',
            in: [
              '0.1',
              '0.2',
              '0.3',
              '1.0',
              '1.1',
              '1.2',
              '1.4',
              '3.1',
              '3.2',
              '3.3',
              '3.5',
              '5.2',
              '5.3',
              '5.5',
            ],
            randomOrder: true,
          },
          final: {
            type: 'enum',
            in: [
              '0.1',
              '0.2',
              '0.3',
              '1.0',
              '1.1',
              '1.2',
              '1.4',
              '3.1',
              '3.2',
              '3.3',
              '3.5',
              '5.2',
              '5.3',
              '5.5',
            ],
            randomOrder: true,
            nullPercentage: 60,
          },
        },
      },
      subordinateHandshape: {
        type: 'object',
        objectContent: {
          inital: {
            type: 'enum',
            in: [
              '0.1',
              '0.2',
              '0.3',
              '1.0',
              '1.1',
              '1.2',
              '1.4',
              '3.1',
              '3.2',
              '3.3',
              '3.5',
              '5.2',
              '5.3',
              '5.5',
            ],
            randomOrder: true,
          },
          final: {
            type: 'enum',
            in: [
              '0.1',
              '0.2',
              '0.3',
              '1.0',
              '1.1',
              '1.2',
              '1.4',
              '3.1',
              '3.2',
              '3.3',
              '3.5',
              '5.2',
              '5.3',
              '5.5',
            ],
            randomOrder: true,
            nullPercentage: 60,
          },
        },
      },
      published: {
        type: 'enum',
        in: [true, false],
        randomOrder: true,
        nullPercentage: 20,
      },
      proposedNewSign: {
        type: 'enum',
        in: [true, false],
        randomOrder: true,
        nullPercentage: 10,
      },
      keywords: {
        type: 'array',
        minLength: 5,
        maxLength: 5,
        arrayContent: {
          type: 'object',
          objectContent: {
            text: {
              type: 'faker',
              method: 'Word',
            },
            primary: {
              type: 'enum',
              in: [true, false, false, false, false],
            },
          },
        },
      },
      definitions: {
        type: 'array',
        minLength: 1,
        maxLength: 8,
        arrayContent: {
          type: 'object',
          objectContent: {
            partOfSpeech: {
              type: 'enum',
              in: ['noun', 'verb', 'adjective'],
              randomOrder: true,
            },
            text: {
              type: 'faker',
              method: 'Quote',
            },
          },
        },
      },
      region: {
        type: 'enum',
        in: ['VIC', 'NSW', 'SA', 'NT', 'TAS', 'WA', 'QLD', 'STH', 'NTH', 'AUS'],
        randomOrder: true,
      },
    },
  },
]
