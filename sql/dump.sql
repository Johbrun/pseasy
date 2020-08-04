-- Insert categories (2019)
INSERT INTO `category` (`id`, `number`, `name`) VALUES
(0, '1.1', 'BILANS'),
(1, '1.2', 'PROTECTION ET SECURITE'),
(2, '1.3', 'HYGIENE ET ASEPSIE'),
(3, '1.4', 'URGENCES VITALES'),
(5, '1.5', 'MALAISES ET AFFECTIONS SPECIFIQUES'),
(6, '1.6', 'ATTEINTES CIRCONSTANCIELLES'),
(8, '1.7', 'TRAUMATISMES'),
(10, '1.8', 'SOUFFRANCE PSYCHIQUE ET COMPORTEMENTS INHABITUELS'),
(11, '1.9', 'RELEVAGE ET BRANCARDAGE'),
(12, '2.1', 'GESTES D’EXAMEN'),
(13, '2.2', 'GESTES DE PROTECTION ET DE SECURITE'),
(14, '2.3', 'GESTES D’HYGIENE ET D’ASEPSIE'),
(15, '2.4', 'GESTES D’URGENCE VITALE'),
(16, '2.5', 'GESTES DE SOINS'),
(18, '2.6', 'POSITIONS D’ATTENTE'),
(19, '2.7', 'IMMOBILISATIONS'),
(20, '2.8', 'RELEVAGE ET BRANCARDAGE');

-- Insert sheets level (2019)
UPDATE `sheet` 
SET `level` = 1
;
UPDATE `sheet` 
SET `level` = 2
WHERE `reference` IN (
'PR02P05',
'PR02P04',
'PR02P01',
'PR02P03',
'PR02P02',
'AC05A01',
'PR05A01',
'AC05C01',
'PR05C01',
'AC05C02',
'PR05C02',
'AC05D01',
'PR05D01',
'AC05M01',
'PR05M01',
'AC06A01',
'PR06A01',
'AC06A02',
'PR06A02',
'AC06A03',
'PR06A01',
'PR06A03',
'AC06A04',
'PR06C01',
'PR06I01',
'PR06H01',
'AC06C01',
'PR06C02',
'AC06E01',
'PR06E01',
'AC06G01',
'PR06G01',
'AC06H01',
'PR06H02',
'AC06I01',
'PR06I02',
'PR06I03',
'AC06P01',
'PR06P01',
'AC06P02',
'PR06P02',
'AC06S01',
'PR06S01',
'AC06V01',
'PR06V01',
'AC07T01',
'PR07T01',
'AC07T03',
'PR07T03',
'AC07T04',
'PR07T04',
'AC07T05',
'PR07T05',
'AC07T06',
'PR07T06',
'AC07T02',
'PR07T02',
'AC08C01',
'PR08A01',
'PR08A03',
'PR08A04',
'PR08E01',
'AC08S01',
'PR08A02',
'PR08A05',
'PR08C01',
'PR08D01',
'PR08D02',
'PR08E02',
'PR08M01',
'AC08S02',
'PR08S01',
'AC09R01',
'AC10S01'
)